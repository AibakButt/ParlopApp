import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { categoryReducer } from './reducers/categoryReducer';


const AllReducers = combineReducers({
    categoryReducer: categoryReducer
});

const store = createStore(AllReducers, compose(applyMiddleware(thunk)));

export default store;
