import axios from "axios";
import store from "../index";
import * as ActionTypes from "../types/couponTypes";
import {UPDATE_ORDER} from "../types/orderTypes";
import { getCurrentCustomer } from "./authentication";
const apiEndPoint = "https://parlor-server.herokuapp.com/api/customer";

export const fetchCoupons = async (dispatch) => {
  try {
    const { data } = await axios.get(apiEndPoint+"/"+ (await getCurrentCustomer()).id);
    // console.log("coupons...",data.customer.coupons)
    dispatch({
      type: ActionTypes.FETCH_COUPONS,
      payload: data.customer.coupons,
    });
  } catch (error) {
    console.log(error);
  }
};

export const applyCoupon = async (dispatch) => {
  try {
    const { data } = await axios.get(apiEndPoint+"/"+ (await getCurrentCustomer()).id);
    let coupon = {...store.getState().couponReducer.coupon};
    
    let couponFound = data.customer.coupons.filter(c => (c.code+'' == coupon.code+'')?true:false)
    // console.log("Coupon Found",couponFound, coupon.code)
    let order = {...store.getState().orderReducer.order};
    
    let couponObj = couponFound && couponFound.length > 0 && couponFound[0]
    order.discount = couponObj && couponObj.discount ? order.price * couponObj.discount / 100 : couponObj.price
    order.coupon = couponObj && couponObj.code

    console.log("order coupons...",order)
    dispatch({
      type: UPDATE_ORDER,
      payload: order,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleTextChange = async (dispatch, field ,value) => {
  try {
      let coupon = {...store.getState().orderReducer.coupon};
      
      coupon[field] = value
       console.log(coupon)
      dispatch({
          type: ActionTypes.HANDLE_TEXT_CHANGE_COUPON,
          payload: coupon,
    });
  } catch (error) {
    console.log(error);
  }
};


