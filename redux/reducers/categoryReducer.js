import * as ActionTypes from "../types/categoryTypes";

let initialState = {
  categories: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ActionTypes.FETCH_CATEGORIES:
      return { ...state, categories: action.payload };

    default:
      return state;
  }
};
