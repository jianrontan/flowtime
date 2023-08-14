import { useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Text, FlatList, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { getDoc, updateDoc, doc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';

import { styles, tagStyles } from '../myComponents';
import { setTags } from '../redux/actions';
import { COLORS, SIZES } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Tags() {
    const auth = getAuth();
    const dispatch = useDispatch();

    const [tag, setTag] = useState('');
    const [tagsArray, setTagsArray] = useState([]);

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
                id: userId
            });

            data = {
                tag: ["Study", "Work", "Reading"],
                id: userId
            }
        }

        setTagsArray(data.tag);

    }

    useEffect(() => {
        getOrCreateFirestoreData();
    }, []);

    const handleAddTag = async () => {
        if (tagsArray.length >= 15) {
            alert('Maximum number of tags reached');
        } else if (tag.length > 20) {
            alert('Tag should not exceed 20 characters');
        } else if (tag.length === 0) {
            alert('Please enter a tag');
        } else {
            try {
                // Clear field
                setTag('');

                // Add tag to local state
                setTagsArray([...tagsArray, tag]);

                // Add tag to redux
                dispatch(setTags([...tagsArray, tag]));

                // Add tag to firestore
                const userId = auth.currentUser.uid;
                const userDocRef = doc(db, 'tags', userId);
                await updateDoc(userDocRef, { tag: arrayUnion(tag) });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    const handleRemove = async (tagToRemove) => {
        Alert.alert(
            "Remove Tag",
            "Are you sure you want to remove this tag?",
            [
                {
                text: "Cancel",
                style: "cancel"
                },
                { 
                    text: "OK", onPress: async () => {
                    try {
                        // Remove tag from local state
                        const newTagsArray = tagsArray.filter(tag => tag !== tagToRemove);
                        setTagsArray(newTagsArray);
            
                        // Remove tag from Redux
                        dispatch(setTags(newTagsArray));
            
                        // Remove tag from Firestore
                        const userId = auth.currentUser.uid;
                        const userDocRef = doc(db, 'tags', userId);
                        await updateDoc(userDocRef, { tag: arrayRemove(tagToRemove) });
                } catch (e) {
                        console.error("Error removing tag: ", e);
                }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.grayBeige }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={tagStyles.inputView}>
                        <View style={tagStyles.inputView2}>
                            <TextInput
                                style={tagStyles.inputText}
                                value={tag}
                                onChangeText={setTag}
                                placeholder="Add new tag"
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={tagStyles.buttonStyle} onPress={handleAddTag}>
                        <Text style={tagStyles.buttonTextStyle}>Add Tag</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        style={tagStyles.listStyle}
                        data={tagsArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => 
                            <TouchableOpacity onLongPress={() => handleRemove(item)}>
                                <Text style={tagStyles.text}>{item}</Text>
                            </TouchableOpacity>
                        }
                        contentContainerStyle={{ flex: 1, padding: SIZES.medium }}
                        ItemSeparatorComponent={() => <View style={{ 
                            height: 1, 
                            backgroundColor: COLORS.sepGrayBeige,
                        }}/>}
                    />
                </View>
                
        </SafeAreaView>
  );
}

export default Tags;