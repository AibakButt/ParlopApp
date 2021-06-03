import * as ActionTypes from "../types/serviceTypes";

let initialState = {
  services: [],
};

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SERVICES:
      return { ...state, services: action.payload };

    default:
      return state;
  }
};
