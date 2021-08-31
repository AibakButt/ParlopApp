import * as ActionTypes from "../types/orderTypes";

let initialState = {
    order: {
        date: new Date(),
        time: new Date(new Date().setHours(0,0,0,0)),
        service: [],
        orderTotal: 0,
        discount: 0,
        coupon: "",
        address: "",
        area: "",
        phone: "",
        price: "",
        start_time: "",
        end_time: "",
        specialInstructions: "",
        travelCharges: 0
    },
    orders: []
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_SERVICES_FROM_CART:
      return { ...state, order: action.payload };
    case ActionTypes.HANDLE_TEXT_CHANGE_ORDER:
      return { ...state, order: action.payload };
    case ActionTypes.UPDATE_ORDER:
      return { ...state, order: action.payload };
    case ActionTypes.FETCH_ORDERS:
      return { ...state, orders: action.payload}
    case ActionTypes.START_TIME:
      return { ...state, orders: action.payload}
    case ActionTypes.END_TIME:
      return { ...state, orders: action.payload}
    
    default:
      return state;
  }
};
