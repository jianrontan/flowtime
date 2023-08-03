import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { getAuth } from 'firebase/auth';

import tagStyles from './StudyTag.style';
import { setSelectedTag } from '../../../redux/actions';
import { COLORS, FONT, SIZES } from '../../../constants';

export default function StudyTag({inactive}) {
  const [selectedTag, setSelectedTagState] = useState("")
  
  const tags = useSelector(state => state.tagsReducer.tagArr);
  const auth = getAuth();
  const dispatch = useDispatch();

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

  const handleSelect = async (selectedItem, index) => {
    setSelectedTagState(selectedItem);
    dispatch(setSelectedTag(selectedItem));

    const userId = getAuth().currentUser.uid;
    const userDocRef = doc(db, 'tags', userId);
    await setDoc(userDocRef, { selectedTag: selectedItem }, { merge: true });
  };

  return (
    <View>
      <SelectDropdown
        disabled={inactive}
        data={tags}
        defaultValue={selectedTag}
        onSelect={handleSelect}
        buttonTextAfterSelection={(selectedItem, index) => (
          <Text>{selectedItem}</Text>
        )}
        rowTextForSelection={(item, index) => (
          <Text style={tagStyles.dropdownText}>{item}</Text>
        )}
        statusBarTranslucent={true}
        showsVerticalScrollIndicator={false}
        buttonStyle={tagStyles.tagButton}
        buttonTextStyle={tagStyles.tagText}
        dropdownStyle={{
          backgroundColor: COLORS.lightBeige,
          borderRadius: SIZES.xLarge / 1.25,
        }}
        rowStyle={tagStyles.dropdownOption}
      />
    </View>
  )
}
