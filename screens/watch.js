import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';

import { setSelectedTag } from '../redux/actions';
import { StudyTag } from '../myComponents';
import { setTotalSavedTime } from '../redux/actions';
import { COLORS, FONT, SIZES } from '../constants';
import styles from '../myComponents/study/Styles/break.style';

function Watch({ route, navigation }) {
    const auth = getAuth();
    const dispatch = useDispatch();
    const { sliderValue, startStopwatch } = route.params;
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [time, setTime] = useState("00:00:00");

    const [msSinceEpoch, setMsSinceEpoch] = useState(null);
    const [timeFormatted, setTimeFormatted] = useState(null);

    useEffect(() => {
        setMsSinceEpoch(new Date().getTime());
        setTimeFormatted(new Date());
    }, []);

    const tags = useSelector(state => state.tagsReducer.tagArr);
    const [selectedTag, setSelectedTagState] = useState("")

    const onTimeUpdate = useCallback((time) => {
        setTimeout(() => {
            setTime(time);
        }, 0);
    }, []);

    useEffect(() => {
        if (startStopwatch) {
            setTimeout(() => {
                setIsStopwatchStart(true);
            }, 0);
        }
    }, [startStopwatch]);

    useEffect(() => {
        async function getLastSelectedTag() {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'tags', userId);
    
            try {
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    if (data.selectedTag && tags.includes(data.selectedTag)) {
                        setSelectedTagState(data.selectedTag);
                        dispatch(setSelectedTag(data.selectedTag));
                    } else if (tags.length > 0) {
                        setSelectedTagState(tags[0]);
                    dispatch(setSelectedTag(tags[0]));
                    }
                }
            } catch (error) {
                console.error("Error loading tags: ", e);
            }
        }
    
        getLastSelectedTag();
    
    }, [tags]);

    async function createFirestoreData() {
        const userId = auth.currentUser.uid;
        const docRef = await addDoc(collection(db, "statistics"), {
            ms: msSinceEpoch,
            formatted: timeFormatted,
            length: time,
            tagged: selectedTag,
            id: userId, 
        })
    }
    
    const onBreakPress = async () => {
        await createFirestoreData();
        setIsStopwatchStart(false);
        navigation.reset({
            index: 0,
            routes: [{
                name: 'Break',
                params: { time: time, sliderValue: sliderValue },
            }]
        });
    };

    const onEndPress = async () => {
        await createFirestoreData();
        dispatch(setTotalSavedTime(0));
        setIsStopwatchStart(false);
        navigation.reset({
            index: 0,
            routes: [{
                name: 'Home',
            }]
        });
    };
    
    const options = {
        container: {
            width: 266,
            height: 80,
            backgroundColor: COLORS.lightBeige,
            borderRadius: SIZES.large / 1.25,
            borderWidth: 1.5,
            borderColor: COLORS.themeColor,
            alignItems: "center",
            justifyContent: "center",
        },
        text: {
            fontFamily: FONT.bold,
            fontSize: SIZES.xxLarge,
            color: COLORS.themeColor,
        },
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium, }}>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <Text style={styles.headerText}>Focus time</Text>
                    </View>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <Stopwatch 
                            start={isStopwatchStart}
                            options={options}
                            getTime={onTimeUpdate}
                        />
                    </View>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <TouchableOpacity style={styles.container} title="Break" onPress={onBreakPress}>
                            <Text style={styles.text}>Break</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <TouchableOpacity style={styles.container} title="End" onPress={onEndPress}>
                            <Text style={styles.text}>End</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <StudyTag inactive={true}/>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Watch;