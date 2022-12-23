import axios from "axios";

const BASE_URL = "http://localhost:3000";

const fetchTodos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        method: "get",
        url: BASE_URL + "/posts",
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

const addTodo = (todo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        method: "post",
        url: BASE_URL + "/posts",
        data: todo,
      });
      return resolve(res.data);
    } catch (error) {
      return reject(error);
    }
  });
};

export { addTodo, fetchTodos };
