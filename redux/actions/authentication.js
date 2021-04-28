import axios from "axios";
import store from "../index";
import * as ActionTypes from "../types/authType";
const apiEndPoint = "https://parlor-server.herokuapp.com/api/customer";

export const sendCode = async (dispatch , auth) => {
  try {
    
    const { data } = await axios.post(apiEndPoint + "/send-code" ,auth );

    console.log('data',data);
     
    let auths = {...store.getState().authReducer.auth};
    if(data){
        auths.request_id = data.request_id;
        auths.isAuth = false;
        auths.isCreated = false;
    }
    console.log('auths',auths);
    dispatch({
      type: ActionTypes.SEND_CODE,
      payload: auths,
    });
  } catch (error) {
    console.log(error);
  }
};


export const verifyCode = async (dispatch , auth) => {
    try {
     
      const { data } = await axios.post(apiEndPoint + "/verify-code" , auth);

      console.log("data",data);
      
      let auths = {...store.getState().authReducer.auth};
      
      if(data){
          auths.isAuth = true;
      }
      console.log("auths",auths);
      dispatch({
        type: ActionTypes.VERIFY_CODE,
        payload: auths,
      });
    } catch (error) {
      console.log(error);
    }
};

export const reSendCode = async (dispatch , auth) => {
    try {
      const { data } = await axios.post(apiEndPoint + "/re-send-code" , auth);
      
      console.log("data",data);

      let auths = {...store.getState().authReducer.auth};
      
      if(data){
          auths.request_id = data.request_id;
          auths.isAuth = false;
          auths.isCreated = false;
          auths.code = '';
      }

      console.log("auths",auths);
      
      dispatch({
        type: ActionTypes.RESEND_CODE,
        payload: auths,
      });
    } catch (error) {
      console.log(error);
    }
};

export const saveCustomer = async (dispatch , auth) => {
  try {

    const { data } = await axios.post(apiEndPoint + "/" , auth);
    
    console.log("data",data);

    console.log("auth",auth);

    let auths = {...store.getState().authReducer.auth};
    
    if(data){

        auths.isAuth = true;
        auths.isCreated = true;
        auths.code = '';
    }

    console.log("auths",auths);
    
    dispatch({
      type: ActionTypes.RESEND_CODE,
      payload: auths,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleTextChangeNumber = (dispatch, e) => {
    let auth = {...store.getState().authReducer.auth};
    auth.phoneNumber = e;
    console.log('dssksf',auth,e);
    dispatch({
      type: ActionTypes.HANDLE_TEXT_CHANGE_NUMBER,
      payload: auth,
    });
};

export const handleTextChangeCode = (dispatch, e) => {
    let auth = {...store.getState().authReducer.auth};
    auth.code = e;
    console.log('sfkjsfs',auth,e);
    dispatch({
      type: ActionTypes.HANDLE_TEXT_CHANGE_CODE,
      payload: auth,
    });
};

export const handleTextChangeName = (dispatch, e) => {
  let auth = {...store.getState().authReducer.auth};
  auth.nameCustomer = e;
  console.log('sfkjsfs',auth,e);
  dispatch({
    type: ActionTypes.HANDLE_TEXT_CHANGE_NAME,
    payload: auth,
  });
};
