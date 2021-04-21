import * as ActionTypes from "../types/cartTypes";

let initialState = {
    cartServices: []
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return { ...state, cartServices: action.payload };
    case ActionTypes.REMOVE_TO_CART:
      return { ...state, cartServices: action.payload };
    case ActionTypes.REMOVE_ALL_TO_CART:
      return { ...state, cartServices: action.payload };
    default:
      return state;
  }
};
