import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { categoryReducer } from "./reducers/categoryReducer";
import { cartReducer } from './reducers/cartReducer';
import { serviceReducer } from './reducers/serviceReducer';

const AllReducers = combineReducers({
  cartReducer: cartReducer,
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
