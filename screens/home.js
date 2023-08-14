import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, getDoc, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';

import { setBreakContinue, setBreakSave, setNotification, setSlider, setTags, setTotalSavedTime, setSelectedTag } from '../redux/actions';
import { COLORS, icons, images, FONT, SIZES } from '../constants';
import { TimeSlider, SessionBtn, StudyTag } from '../myComponents';

function Home({navigation}) {
    const auth = getAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        async function getOrCreateFirestoreData() {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'settings', userId);
            const userDocSnap = await getDoc(userDocRef);
      
            let data = {};
      
            if (userDocSnap.exists()) {
                data = userDocSnap.data();
            } else {
                await setDoc(userDocRef, {
                    continue: false,
                    save: false,
                    notification: false,
                    slider: 10,
                    id: userId
                });
            
                data = {
                    continue: false,
                    save: false,
                    notification: false,
                    slider: 10,
                    id: userId
                };
            }
    
            dispatch(setBreakContinue(data.continue));
            dispatch(setBreakSave(data.save));
            dispatch(setNotification(data.notification));
            dispatch(setSlider(data.slider));
    
        }
        getOrCreateFirestoreData();
    }, []);

    useEffect(() => {
        async function getOrCreateFirestoreData() {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'tags', userId);
            const userDocSnap = await getDoc(userDocRef);

            let data = {};

            if (userDocSnap.exists()) {
                data = userDocSnap.data();
            } else {
                await setDoc(userDocRef, {
                    tag: ["Study", "Work", "Reading"],
                    selectedTag: "Study",
                    id: userId
                });

                data = {
                    tag: ["Study", "Work", "Reading"],
                    selectedTag: "Study",
                    id: userId
                }
            }

            dispatch(setTags(data.tag));
            dispatch(setSelectedTag(data.selectedTag));

        }
        getOrCreateFirestoreData();
    }, []);

    const sliderValue = useSelector((state) => state.settingsReducer.sliderVal);
    async function updateFirestore(newValue) {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'settings', userId);
        await updateDoc(userDocRef, {
            slider: newValue,
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium, }}>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <SessionBtn onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{
                                    name: 'Watch', 
                                    params: { sliderValue: sliderValue, startStopwatch: true }
                                }],
                            })
                        }}/>
                    </View>
                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <TimeSlider
                            sliderValue={sliderValue}
                            setSliderValue={(value) => {
                                dispatch(setSlider(value));
                                updateFirestore(value);
                            }} 
                        />
                    </View>
                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <StudyTag inactive={false}/>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
