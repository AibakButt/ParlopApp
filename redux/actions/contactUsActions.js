import axios from "axios";
import * as ActionTypes from "../types/contactUsTypes";
import store from "../index";
const apiEndPoint = "https://parlor-server.herokuapp.com/api/contactUs";
import { showMessage, hideMessage } from "react-native-flash-message";

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

export const submitContactUs = async (dispatch) => {
  console.log("innnn")
  try {
    let contactUs = {...store.getState().contactUsReducer.contactUs};
    let { data } = await axios.post(apiEndPoint, {customerName: contactUs.fullName, customerEmail: contactUs.email, message: contactUs.message, subject: contactUs.subject})
    showMessage({
      message: "Your response has been submitted",
      type: "success",
      floating: true
    });
    //reset fields
    contactUs.fullName = ""
    contactUs.email = ""
    contactUs.subject = ""
    contactUs.message = ""
    contactUs.natureOfSubject = ""

    dispatch({
      type: ActionTypes.HANDLE_TEXT_CHANGE,
      payload: contactUs,
  });
    
  } catch (error) {
    console.log(error)
    showMessage({
      message: "Your response cannot be subbmitted at this time. Try again later",
      type: "danger",
      floating: true
    });
  }
}