import axios from "axios";

const BASE_URL = "http://localhost:3000";

const fetchTodos = async () => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/posts",
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

const addTodo = async (todo) => {
  try {
    const res = await axios({
      method: "post",
      url: BASE_URL + "/posts",
      data: todo,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export { addTodo, fetchTodos };
