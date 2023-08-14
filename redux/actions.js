export const SET_BREAK_CONTINUE = 'SET_BREAK_CONTINUE';
export const SET_BREAK_SAVE = 'SET_BREAK_SAVE';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_SLIDER = 'SET_SLIDER';
export const SET_TOTAL_BREAK_TIME = 'SET_TOTAL_BREAK_TIME';
export const SET_TAGS = 'SET_TAGS';
export const SET_SELECTED_TAG = 'SET_SELECTED_TAG'

export const setBreakContinue = continueVal => {
  return dispatch => {
    dispatch({
      type: SET_BREAK_CONTINUE,
      payload: continueVal,
    });
  };
};

export const setBreakSave = saveVal => {
  return dispatch => {
    dispatch({
      type: SET_BREAK_SAVE,
      payload: saveVal,
    });
  };
};

export const setNotification = notificationVal => {
  return dispatch => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: notificationVal,
    });
  };
};

export const setSlider = sliderVal => {
  return dispatch => {
    dispatch({
      type: SET_SLIDER,
      payload: sliderVal,
    });
  };
};

export const setTotalSavedTime = savedVal => {
  return dispatch => {
    dispatch({
      type: SET_TOTAL_BREAK_TIME,
      payload: savedVal,
    });
  };
};

export const setTags = tagArr => {
  return dispatch => {
    dispatch({
      type: SET_TAGS,
      payload: tagArr,
    })
  }
}

export const setSelectedTag = selectedTag => {
  return dispatch => {
    dispatch({
      type: SET_SELECTED_TAG,
      payload: selectedTag,
    })
  }
}