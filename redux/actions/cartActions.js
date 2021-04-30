import store from "../index";
import * as ActionTypes from "../types/cartTypes";

export const addToCart = async (dispatch, service) => {
    try {
      
      console.log("inside add to cart",service);
      let cartServices = [...store.getState().cartReducer.cartServices];
      cartServices.push({
          _id:service._id, 
          category: service.category?service.category:'',
          price:service.price,
          name:service.name,
          quantity:1,
          addons:[]
        });
      console.log("added to cart", cartServices);
      dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: cartServices,
      });

    } catch (error) {
      console.log(error);
    }
};


export const addAddOns= async (dispatch, addons, serviceId) => {
  try {
    console.log("inside add to cart",serviceId);
    let cartServices = [...store.getState().cartReducer.cartServices];
    let added=false;
    cartServices.forEach(service => {
      if(service._id===serviceId){
        console.log("am here",serviceId)
        added=true;
        service.addons.push(addons);
      }
    });

    if(!added){
      let services = [...store.getState().serviceReducer.services];
      for (let index = 0; index < services.length; index++) {
        const service = services[index];
        if(service._id===serviceId){
          cartServices.push({
            _id:service._id, 
            category: service.category?service.category:'',
            price:service.price,
            name:service.name,
            quantity:1,
            addons:[addons]
          });
        } 
      }
    }
    console.log("added to cart", cartServices);
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: cartServices,
    });

  } catch (error) {
    console.log(error);
  }
};

export const increaseAddOns = async (dispatch, addonIndex, serviceIndex) => {
  try {
    console.log("inside add to cart",addonIndex,serviceIndex);
    let cartServices = [...store.getState().cartReducer.cartServices];
    let servicetoIcrease = cartServices[serviceIndex];
    if(servicetoIcrease.addons[addonIndex].quantity<servicetoIcrease.quantity){
      servicetoIcrease.addons[addonIndex].quantity++;
    }
    console.log("added to cart", cartServices);
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: cartServices,
    });

  } catch (error) {
    console.log(error);
  }
};

export const decreaseAddOns = async (dispatch, addonIndex, serviceIndex) => {
  try {
    console.log("inside add to cart",addonIndex,serviceIndex);
    let cartServices = [...store.getState().cartReducer.cartServices];
    
    let servicetoIcrease = cartServices[serviceIndex];
    if(servicetoIcrease.addons[addonIndex].quantity!==1){
      servicetoIcrease.addons[addonIndex].quantity--;
    }else if(servicetoIcrease.addons[addonIndex].quantity===1){
      servicetoIcrease.addons.splice(addonIndex, 1);
    }
    
    console.log("added to cart", cartServices);
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: cartServices,
    });

  } catch (error) {
    console.log(error);
  }
};

export const increaseService = async (dispatch, serviceIndex) => {
  try {
    console.log("inside add to cart",serviceIndex);
    let cartServices = [...store.getState().cartReducer.cartServices];
    let servicetoIcrease = cartServices[serviceIndex];
    servicetoIcrease.quantity++;
    console.log("added to cart", cartServices);
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: cartServices,
    });

  } catch (error) {
    console.log(error);
  }
};

export const decreaseService = async (dispatch, serviceIndex) => {
  try {
    console.log("inside add to cart",serviceIndex);
    let cartServices = [...store.getState().cartReducer.cartServices];
    
    let servicetoIcrease = cartServices[serviceIndex];
    if(servicetoIcrease.quantity!==1){
      servicetoIcrease.quantity--;
    }else if(servicetoIcrease.quantity===1){
      cartServices.splice(serviceIndex, 1);
    }
    
    console.log("added to cart", cartServices);
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: cartServices,
    });

  } catch (error) {
    console.log(error);
  }
};


export const removeToCart = async (dispatch, serviceId) => {
    try {
      
      let cartServices = [...store.getState().cartReducer.cartServices];
      cartServices = cartServices.filter((a) => a._id !== serviceId);
  
      dispatch({
        type: ActionTypes.REMOVE_TO_CART,
        payload: cartServices,
      });

    } catch (error) {
      console.log(error);
    }
};



export const removeAllToCart = async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.REMOVE_ALL_TO_CART,
        payload: [],
      });

    } catch (error) {
      console.log(error);
    }
};