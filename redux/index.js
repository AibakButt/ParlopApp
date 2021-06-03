import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { categoryReducer } from "./reducers/categoryReducer";
import { cartReducer } from './reducers/cartReducer';
import { serviceReducer } from './reducers/serviceReducer';
import { authReducer } from './reducers/authentication';
import { orderReducer } from './reducers/orderReducer';
import { dealImagesReducer } from './reducers/dealImagesReducer';
import { couponReducer } from './reducers/couponReducer';
import { contactUsReducer } from './reducers/contactUsReducer';

const AllReducers = combineReducers({
  cartReducer: cartReducer,
  authReducer: authReducer,
  categoryReducer: categoryReducer,
  serviceReducer: serviceReducer,
  orderReducer: orderReducer,
  dealImagesReducer: dealImagesReducer,
  couponReducer: couponReducer,
  contactUsReducer: contactUsReducer,
});

const store = createStore(
  AllReducers,
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
