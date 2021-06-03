import axios from "axios";
import * as ActionTypes from "../types/categoryTypes";
const apiEndPoint = "https://parlor-server.herokuapp.com/api/category";

export const fetchCategories = async (dispatch) => {
  try {
    const { data } = await axios.get(apiEndPoint);
    dispatch({
      type: ActionTypes.FETCH_CATEGORIES,
      payload: data.categoryList,
    });
  } catch (error) {
    console.log(error);
  }
};

