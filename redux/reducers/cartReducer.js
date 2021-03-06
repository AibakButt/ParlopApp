import * as ActionTypes from "../types/cartTypes";

let initialState = {
    cartServices: [],
    totalBill: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return { ...state, cartServices: action.payload.cartServices, totalBill: action.payload.totalBill };
    case ActionTypes.REMOVE_TO_CART:
      return { ...state, cartServices: action.payload.cartServices, totalBill: action.payload.totalBill };
    case ActionTypes.REMOVE_ALL_TO_CART:
      return { ...state, cartServices: action.payload.cartServices, totalBill: 0 };
    default:
      return state;
  }
};
