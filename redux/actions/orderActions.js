import store from "../index";
import * as ActionTypes from "../types/orderTypes";
import axios from 'axios';
import { getCurrentCustomer } from "./authentication";

const apiEndPoint = "https://parlor-server.herokuapp.com/api/order";
const apiEndPoint2 = "https://parlor-server.herokuapp.com/api/travelCharges";

export const fetchOrders = async (dispatch) => {
  try {
    const { data } = await axios.get(apiEndPoint+ "/query?customer="+ (await getCurrentCustomer()).id);
    dispatch({
      type: ActionTypes.FETCH_ORDERS,
      payload: data.orderList,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addServicesFromCart = async (dispatch) => {
    try {
        let cartServices = [...store.getState().cartReducer.cartServices];
        let cartTotal = store.getState().cartReducer.totalBill;
    
        let order = {...store.getState().orderReducer.order};
        
        order.service = cartServices
        order.price = cartTotal
        order.orderTotal = order.price 
        dispatch({
            type: ActionTypes.ADD_SERVICES_FROM_CART,
            payload: order,
      });
    } catch (error) {
      console.log(error);
    }
};

export const handleTextChange = async (dispatch, field ,value) => {
  try {
      let order = {...store.getState().orderReducer.order};
      
      if(field === "area"){
        if(value === "Other"){
          let {data} = await axios.get(apiEndPoint2)
          console.log("travel charges....",data)
          order.travelCharges = data.travelCharges[0].charges;
        }
        else{
          order.travelCharges = 0;
        }
      }

      order[field] = value
      console.log(order)
      dispatch({
          type: ActionTypes.HANDLE_TEXT_CHANGE,
          payload: order,
    });
  } catch (error) {
    console.log(error);
  }
};

export const submitOrder = async (dispatch) => {
  try {
    let order = {...store.getState().orderReducer.order};
    order.service.forEach(ser => {
      ser.category = ser.category._id
     } )

    order.customerId = (await getCurrentCustomer()).id
    const { data } = await axios.post(apiEndPoint,order)
    console.log("Your order is submitted...:",order)

     //Reset order data
      order.date= new Date()
      order.time= new Date()
      order.service= []
      order.orderTotal= 0
      order.discount= 0
      order.coupon= ""
      order.address= ""
      order.area= ""
      order.phone= ""
      order.price= ""
      order.start_time= ""
      order.end_time= ""
      order.specialInstructions= ""
      order.travelCharges= 0
     
      dispatch({
        type: ActionTypes.UPDATE_ORDER,
        payload: order,
      });

  } catch (error) {
    console.log(error)
  }
}

export const startServiceTime = async (dispatch, order) => {
  try {
    await axios.put(apiEndPoint+ "/" +order._id, {start_time: new Date()})
    
    let orders = [...store.getState().orderReducer.orders];
    let index = orders.findIndex(a => a._id === order._id);
    orders[index].start_time = new Date();
    orders[index].status = "Working";
    console.log("Order Updated",orders[index])

    dispatch({
      type: ActionTypes.START_TIME,
      payload: orders,
    });

  } catch (error) {
    console.log(error)
  }
}

export const endServiceTime = async (dispatch, order) => {
  try {
    const {data} = await axios.put(apiEndPoint+"/"+order._id, {end_time: new Date()})
    console.log(data)
    let orders = [...store.getState().orderReducer.orders];
    let index = orders.findIndex(a => a._id === order._id);
    orders[index].end_time = new Date();
    orders[index].status = "Completed";
    console.log("Order Completed",orders[index])

    dispatch({
      type: ActionTypes.END_TIME,
      payload: orders,
    });

  } catch (error) {
    console.log(error)
  }
}