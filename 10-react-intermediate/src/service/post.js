import axios from "axios";
import Swal from "sweetalert2";
import { postAction } from "../store/posts/postAction";

const BASE_URL = "http://localhost:3000";

const fetchPosts = () => {
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

const addPost = (todo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: postAction.SET_LOADING });
      await axios({
        method: "post",
        url: BASE_URL + "/posts",
        data: todo,
      });
      dispatch(fetchPosts());
    } catch (err) {
      dispatch({ type: postAction.SET_ERROR, payload: err.message });
    }
  };
};

const deletePost = (todoId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: postAction.SET_LOADING });
      await axios({
        method: "delete",
        url: BASE_URL + "/posts/" + todoId,
      });
      Swal.fire("Deleted!", "Your post has been deleted.", "success");
      dispatch(fetchPosts());
    } catch (err) {
      dispatch({ type: postAction.SET_ERROR, payload: err.message });
    }
  };
};

const editPost = (todo, todoId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: postAction.SET_LOADING });
      await axios({
        method: "patch",
        url: BASE_URL + "/posts/" + todoId,
        data: todo,
      });
      Swal.fire("Updated!", "Your post has been updated.", "success");
      dispatch(fetchPosts());
    } catch (err) {
      dispatch({ type: postAction.SET_ERROR, payload: err.message });
    }
  };
};

const findPost = async (todoId) => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/posts/" + todoId,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

export { addPost, fetchPosts, deletePost, findPost, editPost };
