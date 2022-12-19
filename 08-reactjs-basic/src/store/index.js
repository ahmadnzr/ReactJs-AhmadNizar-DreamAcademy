import { combineReducers, createStore } from "redux";
import { todosReducer } from "./todo/reducer";
// import { newTodo } from "./todo";

// export default combineReducers({ todos, newTodo });
export default createStore(combineReducers({ todos: todosReducer }));
