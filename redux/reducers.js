import { SET_BREAK_CONTINUE, SET_BREAK_SAVE, SET_NOTIFICATION, SET_TOTAL_BREAK_TIME, SET_TAGS, SET_SELECTED_TAG } from "./actions";

const settingsState = {
  continueVal: false,
  saveVal: false,
  notificationVal: false,
  id: '',
}
const totalSavedTime = {
  breakTime: 0,
}
const tagsArray = {
  tagArr: ["Study", "Work", "Reading"],
  selectedTag: null,
}

export function settingsReducer(state = settingsState, action) {
  switch (action.type) {
    case SET_BREAK_CONTINUE:
      return {
        ...state,
        continueVal: action.payload
      };
    case SET_BREAK_SAVE:
      return {
        ...state,
        saveVal: action.payload
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        notificationVal: action.payload
      };
    default:
      return state;
  }
}

export function timeReducer(state = totalSavedTime, action) {
  switch (action.type) {
    case SET_TOTAL_BREAK_TIME:
      return {
        ...state,
        savedVal: action.payload
      };
    default:
      return state;
  }
}

export function tagsReducer(state = tagsArray, action) {
  switch(action.type) {
    case SET_TAGS:
      return {
        ...state,
        tagArr: action.payload ?? [],
      };
    }
  switch(action.type) {
    case SET_SELECTED_TAG:
      return {
        ...state,
        selectedTag: action.payload,
      }
    default:
      return state;
  }
}