import * as ActionTypes from "../types/authType";

let initialState = {
    auth: {
        phoneNumber:'92',
        request_id:'',
        code:'',
        isAuth:''
    }
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEND_CODE:
      return { ...state, auth: action.payload };
    case ActionTypes.RESEND_CODE:
      return { ...state, auth: action.payload };
    case ActionTypes.VERIFY_CODE:
      return { ...state, auth: action.payload };
    case ActionTypes.HANDLE_TEXT_CHANGE_NUMBER:
      return { ...state, auth: action.payload };
    case ActionTypes.HANDLE_TEXT_CHANGE_CODE:
        return { ...state, auth: action.payload };
    default:
      return state;
  }
};
