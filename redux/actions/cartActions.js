import store from "../index";
import * as ActionTypes from "../types/cartTypes";

export const addToCart = async (dispatch, service) => {
    try {
      
      console.log("inside add to cart",service);
      let cartServices = [...store.getState().cartReducer.cartServices];
      cartServices.push({
          _id:service._id, 
          categoryId: service.category._id?service.category._id:'',
          price:service.price,
          name:service.name,
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