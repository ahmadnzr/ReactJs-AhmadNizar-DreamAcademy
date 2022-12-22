import axios from "axios";

const fetchTodoList = async () => {
  return await axios({
    method: "get",
    url: `http://localhost:${3000}/posts`,
  });
};


export {fetchTodoList}