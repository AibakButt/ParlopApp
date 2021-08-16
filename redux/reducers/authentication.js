import * as ActionTypes from "../types/authType";

let initialState = {
    auth: {
        phone: '',
        code: '',
        name: '',
        password: '',
    }
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEND_PHONE_NO:
      return { ...state, auth: action.payload };
    case ActionTypes.VERIFY_CODE:
      return { ...state, auth: action.payload };
    case ActionTypes.RESEND_CODE:
      return { ...state, auth: action.payload };
    case ActionTypes.REGISTER_CUSTOMER:
      return { ...state, auth: action.payload };
    case ActionTypes.HANDLE_TEXT_CHANGE_AUTH:
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};
