import * as ActionTypes from "../types/contactUsTypes";

let initialState = {
  contactUs: {
      fullName: "",
      email: "",
      natureOfSubject: "",
      subject: "",
      message: ""
  }
};

export const contactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ActionTypes.HANDLE_TEXT_CHANGE:
      return { ...state, contactUs: action.payload };

    default:
      return state;
  }
};
