import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
