import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { postReducer } from "./posts/postReducer";

export default createStore(
  combineReducers({ posts: postReducer }),
  applyMiddleware(thunk)
);
