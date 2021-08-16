import axios from "axios";
import store from "../index";
import * as ActionTypes from "../types/authType";
const apiEndPoint = "https://parlor-server.herokuapp.com/api/customer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import jwtDecode from "jwt-decode"

export const sendPhoneNo = async (dispatch) => {
  try {
    let auths = {...store.getState().authReducer.auth};

    const { data } = await axios.post(apiEndPoint + "/sign-up", {phoneNumber: "+92"+auths.phone});
    console.log(data)
   
    dispatch({
      type: ActionTypes.SEND_PHONE_NO,
      payload: {...auths, request_id: data.request_id},
    });

    showMessage({
      message: "Verification code has been sent to your phone number",
      type: "success",
      floating: true
    });
    
  } catch (error) {
    console.log(error);
    showMessage({
      message: error.response.data.message,
      type: "danger",
      floating: true
    });
    throw new Error()
  }
};


export const sendVerificationCode = async (dispatch) => {
    try {

      let auths = {...store.getState().authReducer.auth};
      console.log(auths)
      await axios.post(apiEndPoint + "/verify-code" , {phoneNumber: "+92"+auths.phone, code: auths.code});

      dispatch({
        type: ActionTypes.VERIFY_CODE,
        payload: auths,
      });
      console.log("Code Verified")
    } catch (error) {
      console.log(error.message);
      showMessage({
        message: "You entered invalid code",
        type: "danger",
        floating: true
      });
      throw new Error()
    }
};

export const resendCode = async (dispatch ) => {
    try {
      let auths = {...store.getState().authReducer.auth};
      const { data } = await axios.post(apiEndPoint + "/re-send-code" , {phoneNumber: "+92"+auths.phone});

      dispatch({
        type: ActionTypes.RESEND_CODE,
        payload: auths,
      });

      showMessage({
        message: "Code has been resent",
        type: "success",
        floating: true
      });

    } catch (error) {
      console.log(error);
    }
};

export const registerCustomer = async (dispatch) => {
  try {
    let auths = {...store.getState().authReducer.auth};
    
    const { data } = await axios.post(apiEndPoint + "/" , {phoneNumber: "+92"+auths.phone, nameCustomer: auths.name, password: auths.password});
    console.log(data)
    try {
      await AsyncStorage.setItem("customer", JSON.stringify(data.token) );
    } catch (error) {
      console.log("Error in saving customer token", error)
    }

    showMessage({
      message: "Registered Successfully!",
      type: "success",
      floating: true
    });
    
    dispatch({
      type: ActionTypes.REGISTER_CUSTOMER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    showMessage({
      message: "Error in registering. Please try again!",
      type: "danger",
      floating: true
    });
    throw new Error()
  }
};

export const handleTextChange = (dispatch, value, field) => {
    let auth = {...store.getState().authReducer.auth};
   
    auth[field] = value

    dispatch({
      type: ActionTypes.HANDLE_TEXT_CHANGE_AUTH,
      payload: auth,
    });
};

export const checkPhoneNoExists = async (dispatch) => {
  try {
    let auths = {...store.getState().authReducer.auth};

    const { data } = await axios.post(apiEndPoint + "/phone-no-exists", {phoneNumber: "+92" + auths.phone});
    // console.log(data)
   
    dispatch({
      type: ActionTypes.SEND_PHONE_NO,
      payload: {...auths, request_id: data.request_id},
    });
    
  } catch (error) {
    
    showMessage({
      message: error.response.data.message,
      type: "danger",
      floating: true
    });
    throw new Error()
  }
};

export const login = async (dispatch) => {
    try {

      let auths = {...store.getState().authReducer.auth};
      const { data } = await axios.post(apiEndPoint + "/sign-in" , { password: auths.password, phoneNumber: "+92"+auths.phone });
      console.log(data.token)
      try {
        await AsyncStorage.setItem("customer", JSON.stringify(data.token));
      } catch (error) {
        console.log("Error in saving customer token", error)
      }  
   
      dispatch({
        type: ActionTypes.REGISTER_CUSTOMER,
        payload: auths,
      });
    } catch (error) {
      console.log(error);
      showMessage({
        message: "Your password is incorrect",
        type: "danger",
        floating: true
      });
      throw new Error()
    }
};


export const createNewPassword = async (dispatch) => {
  try {
    let auths = {...store.getState().authReducer.auth};

    const { data } = await axios.post(apiEndPoint + "/createNewPassword", {phoneNumber: "+92" + auths.phone, password: auths.password});
    console.log(data.token)
      try {
        await AsyncStorage.setItem("customer", JSON.stringify(data.token));
      } catch (error) {
        console.log("Error in saving customer token", error)
      }  
   
      dispatch({
        type: ActionTypes.REGISTER_CUSTOMER,
        payload: auths,
      });
    
  } catch (error) {
    
    showMessage({
      message: error.response.data.message,
      type: "danger",
      floating: true
    });
    throw new Error()
  }
};


export function logout() {
  console.log("logging out...");
  localStorage.removeItem("customer");
}

export async function getCurrentCustomer() {
  try {
    const jwt = await AsyncStorage.getItem("customer");
    let customer = await jwtDecode(JSON.parse(jwt));
    console.log("Customer token fetched from local storage", customer)
    return customer
  } catch (err) {
    console.log("Error in fetch customer token from local storage:", err)
    return null;
  }
}
