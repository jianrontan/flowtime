export const SET_BREAK_CONTINUE = 'SET_BREAK_CONTINUE';
export const SET_BREAK_SAVE = 'SET_BREAK_SAVE';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_TOTAL_BREAK_TIME = 'SET_TOTAL_BREAK_TIME'

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

export const setTotalSavedTime = savedVal => {
  return dispatch => {
    dispatch({
      type: SET_TOTAL_BREAK_TIME,
      payload: savedVal,
    });
  };
};
