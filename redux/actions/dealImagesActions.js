import axios from "axios";
import * as ActionTypes from "../types/dealImagesTypes";
const apiEndPoint = "https://parlor-server.herokuapp.com/api/dealImages";

export const fetchDealImages = async (dispatch) => {
  try {
    const { data } = await axios.get(apiEndPoint);
    dispatch({
      type: ActionTypes.FETCH_DEAL_IMAGES,
      payload: data.dealImagesList,
    });
  } catch (error) {
    console.log(error);
  }
};