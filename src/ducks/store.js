import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
