import axios from "axios";
import * as ActionTypes from "../types/serviceTypes";
const apiEndPoint = "https://parlor-server.herokuapp.com/api/services";

export const fetchServices = async (dispatch) => {
  try {
    const { data } = await axios.get(apiEndPoint);

    dispatch({
      type: ActionTypes.FETCH_SERVICES,
      payload: data.servicesList?data.servicesList:[],
    });
  } catch (error) {
    console.log(error);
  }
};