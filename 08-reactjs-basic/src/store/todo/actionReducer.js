import { actionType } from "./actionType";

const deleteTodo = (id) => ({
  type: actionType.DELETE_TODO,
  payload: { todoId: id },
});

const editTodo = (todo) => ({
  type: actionType.EDIT_TODO,
  payload: { todo },
});

const addTodo = (todo) => ({
  type: actionType.ADD_TODO,
  payload: { todo },
});

export { deleteTodo, editTodo, addTodo };
