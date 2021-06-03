import * as ActionTypes from "../types/dealImagesTypes";

let initialState = {
  dealImages: [],
};

export const dealImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ActionTypes.FETCH_DEAL_IMAGES:
      return { ...state, dealImages: action.payload };

    default:
      return state;
  }
};
