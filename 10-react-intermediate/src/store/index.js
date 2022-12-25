import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { postReducer } from "./todo/postReducer";

export default createStore(
  combineReducers({ posts: postReducer }),
  applyMiddleware(thunk)
);
