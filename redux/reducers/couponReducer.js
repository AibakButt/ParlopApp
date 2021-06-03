import * as ActionTypes from "../types/couponTypes";

let initialState = {
  coupon: {
    code: ""
  },
  coupons: [],
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ActionTypes.FETCH_COUPONS:
      return { ...state, coupons: action.payload };
    
    case ActionTypes.HANDLE_TEXT_CHANGE_COUPON:
      return { ...state, coupon: action.payload };

    default:
      return state;
  }
};
