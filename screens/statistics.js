import { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import CalendarPicker from  'react-native-calendar-picker';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, Timestamp, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { COLORS, icons, images, FONT, SIZES } from '../constants';

function Statistics() {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const maxDate = new Date();
  const [groupsRange, setGroupsRange] = useState({});
  const [groupsTotal, setGroupsTotal] = useState({});

  // FUNCTION TO SELECT AND STORE SELECTED DATES //
  function onDateChange(date, type) {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  }
  // FUNCTION TO SELECT AND STORE SELECTED DATES //

  // DISPLAY THE DATES //
  const formatDateString = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toDateString();
  };
  const startDate  =  selectedStartDate ? formatDateString(selectedStartDate) : '';
  const endDate = selectedEndDate ? formatDateString(selectedEndDate) : '';
  // DISPLAY THE DATES //

  // RANGE OF DATES TO SELECT FROM FIREBASE //
  const startOfDay = (date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };
  const endOfDay = (date) => {
    date.setHours(23, 59, 59, 999);
    return date;
  };
  const startDateTimestamp = startDate ? Timestamp.fromDate(startOfDay(new Date(startDate))) : null;
  const endDateTimestamp = endDate ? Timestamp.fromDate(endOfDay(new Date(endDate))) : null;
  // RANGE OF DATES TO SELECT FROM FIREBASE //

  // HELPER FUNCTION TO CONVERT TIME TO SECONDS //
  function toSeconds(time) {
    let parts = time.split(':');
    return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]); 
  }
  // HELPER FUNCTION TO CONVERT TIME TO SECONDS //

  // QUERY FOR THE RANGE OF DATES //
  async function fetchRangeData() {
    if (startDateTimestamp && endDateTimestamp) {
      const q = query(collection(db, "statistics"),
        where("id", "==", userId),
        where("formatted", ">=", startDateTimestamp),
        where("formatted", "<=", endDateTimestamp));
    
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let groups = {};
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let time = toSeconds(data.length);
          let tag = data.tagged;

          if (groups[tag]) {
              groups[tag] += time;
          }
          else {
              groups[tag] = time;
          }
        });
        setGroupsRange(groups);
      });
      // Clear listener when the component unmounts
      return() => unsubscribe();
    }
  }
  // QUERY FOR THE RANGE OF DATES //

  // QUERY FOR TOTAL TIME //
  async function fetchTotalData() {
    const q = query(collection(db, "statistics"),
      where("id", "==", userId));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let groups = {};
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        let time = toSeconds(data.length);
        let tag = data.tagged;

        if (groups[tag]) {
            groups[tag] += time;
        }
        else {
            groups[tag] = time;
        }
      });
      setGroupsTotal(groups);
    });
    // Clear listener
    return() => unsubscribe();
  }
  // QUERY FOR TOTAL TIME //

  // FETCH DATA WHENEVER USER SELECTS NEW DATE //
  useEffect(() => {
    fetchRangeData();
  }, [startDate, endDate]);

  useEffect(() => {
    fetchTotalData();
  }, []);
  // FETCH DATA WHENEVER USER SELECTS NEW DATE //

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flex: 1, padding: SIZES.medium }}>
            <CalendarPicker
              allowRangeSelection={true}
              allowBackwardRangeSelect={true}
              onDateChange={onDateChange}
              maxDate={maxDate}
              textStyle={{
                fontFamily: FONT.medium,
                color: COLORS.themeColor,
                fontSize: SIZES.medium
              }}
            />
        </View>

        <View style={{ paddingHorizontal: SIZES.medium}}>
          <View style={{ borderColor: COLORS.themeColor, borderWidth: 1.5, borderRadius: SIZES.medium }}>
            <Text style={{ fontFamily: FONT.medium, color: COLORS.themeColor, padding: 5, fontSize: SIZES.small }}>
              Range: {startDate ? startDate : 'Select a date'} {endDate ? `- ${endDate}` : ''}
            </Text>
          </View>
        </View>

        <View style={{ padding: SIZES.medium }}>
          <View>
            <Text style={{
              fontFamily: FONT.bold,
              color: COLORS.themeColor,
              paddingHorizontal: 8,
              paddingVertical: 5,
              fontSize: SIZES.mediumlarge,
            }}>
              Range Focus Time
            </Text>
            {Object.entries(groupsRange).sort((a, b) => b[1] - a[1]).map(([tag, time]) => {
              let hours = Math.floor(time / 3600);
              let minutes = Math.floor((time % 3600) / 60);
              let seconds = time % 60;

              // Pad time values with zeros if less than 10
              hours = hours < 10 ? '0' + hours : hours;
              minutes = minutes < 10 ? '0' + minutes : minutes;
              seconds = seconds < 10 ? '0' + seconds : seconds;

              return (
                <Text key={tag} style={{
                  fontFamily: FONT.medium,
                  color: COLORS.themeColor,
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                  fontSize: SIZES.medium,
                  }}>
                  {tag}: {hours}:{minutes}:{seconds}
                </Text>
              );
            })}
          </View>
        </View>

        <View style={{ padding: SIZES.medium }}>
          <View>
            <Text style={{
              fontFamily: FONT.bold,
              color: COLORS.themeColor,
              paddingHorizontal: 8,
              paddingVertical: 5,
              fontSize: SIZES.mediumlarge,
            }}>
              Total Focus Time
            </Text>
            {Object.entries(groupsTotal).sort((a, b) => b[1] - a[1]).map(([tag, time]) => {
              let hours = Math.floor(time / 3600);
              let minutes = Math.floor((time % 3600) / 60);
              let seconds = time % 60;

              // Pad time values with zeros if less than 10
              hours = hours < 10 ? '0' + hours : hours;
              minutes = minutes < 10 ? '0' + minutes : minutes;
              seconds = seconds < 10 ? '0' + seconds : seconds;

              return (
                <Text key={tag} style={{
                  fontFamily: FONT.medium,
                  color: COLORS.themeColor,
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                  fontSize: SIZES.medium,
                  }}>
                  {tag}: {hours}:{minutes}:{seconds}
                </Text>
              );
            })}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default Statistics;