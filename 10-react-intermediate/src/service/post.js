import axios from "axios";
import Swal from "sweetalert2";
import { postAction } from "../store/posts/postAction";

const BASE_URL = "http://localhost:3000";

const fetchTodos = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: postAction.SET_LOADING });
      const res = await axios({
        method: "get",
        url: BASE_URL + "/posts",
      });
      dispatch({ type: postAction.POPULATE_POST, payload: res.data });
    } catch (err) {
      dispatch({ type: postAction.SET_ERROR, payload: err.message });
    }
  };
};

const addTodo = (todo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: postAction.SET_LOADING });
      await axios({
        method: "post",
        url: BASE_URL + "/posts",
        data: todo,
      });
      dispatch(fetchTodos());
    } catch (err) {
      dispatch({ type: postAction.SET_ERROR, payload: err.message });
    }
  };
};

const deleteTodo = (todoId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: postAction.SET_LOADING });
      await axios({
        method: "delete",
        url: BASE_URL + "/posts/" + todoId,
      });
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      dispatch(fetchTodos());
    } catch (err) {
      dispatch({ type: postAction.SET_ERROR, payload: err.message });
    }
  };
};

export { addTodo, fetchTodos, deleteTodo };
