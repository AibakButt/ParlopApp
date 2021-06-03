import axios from "axios";
import * as ActionTypes from "../types/contactUsTypes";
import store from "../index";
const apiEndPoint = "https://parlor-server.herokuapp.com/api/contactUs";

export const handleTextChange = async (dispatch, field ,value) => {
    try {
        let contactUs = {...store.getState().contactUsReducer.contactUs};
        
        contactUs[field] = value
        dispatch({
            type: ActionTypes.HANDLE_TEXT_CHANGE,
            payload: contactUs,
      });
    } catch (error) {
      console.log(error);
    }
};