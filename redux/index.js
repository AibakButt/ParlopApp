import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { categoryReducer } from "./reducers/categoryReducer";
import { cartReducer } from './reducers/cartReducer';
import { serviceReducer } from './reducers/serviceReducer';
import { authReducer } from './reducers/authentication';

const AllReducers = combineReducers({
  cartReducer: cartReducer,
  authReducer: authReducer,
  categoryReducer: categoryReducer,
  serviceReducer: serviceReducer,
});

const store = createStore(
  AllReducers,
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
