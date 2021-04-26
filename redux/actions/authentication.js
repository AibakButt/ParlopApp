import axios from "axios";
import store from "../index";
import * as ActionTypes from "../types/authType";
const apiEndPoint = "https://parlor-server.herokuapp.com/api/customer";

export const sendCode = async (dispatch , auth) => {
  try {
      console.log('gvvhg',auth);
    const { data } = await axios.post(apiEndPoint + "/send-code" ,auth );
     console.log('data',data);
    if(data){
        let auth = {...store.getState().authReducer.auth};
        auth.request_id = data.request_id;
    }
    
    dispatch({
      type: ActionTypes.FETCH_CATEGORIES,
      payload: auth,
    });
  } catch (error) {
    console.log(error);
  }
};


export const verifyCode = async (dispatch , auth) => {
    try {
      const { data } = await axios.post(apiEndPoint + "/verify-code" , auth);
      
      if(data){
          let auth = {...store.getState().authReducer.auth};
          auth.isAuth = true;
      }
      
      dispatch({
        type: ActionTypes.FETCH_CATEGORIES,
        payload: auth,
      });
    } catch (error) {
      console.log(error);
    }
};

export const reSendCode = async (dispatch , auth) => {
    try {
      const { data } = await axios.post(apiEndPoint + "/re-send-code" , auth);
      
      if(data){
          let auth = {...store.getState().authReducer.auth};
          auth.request_id = data.request_id;
      }
      
      dispatch({
        type: ActionTypes.FETCH_CATEGORIES,
        payload: auth,
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
    auth.phoneNumber = e;
    console.log('sfkjsfs',auth,e);
    dispatch({
      type: ActionTypes.HANDLE_TEXT_CHANGE_CODE,
      payload: auth,
    });
};