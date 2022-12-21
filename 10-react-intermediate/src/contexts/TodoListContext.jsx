import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TodoListContext = createContext({});

const TodoListContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  const handleAddTodoList = (newTodo) => {
    setTodoList((prev) => {
      return [...prev, newTodo];
    });
  };

  const fetchTodos = async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:3000/posts",
    });
    setTodoList(res.data);
  };

  useEffect(() => {
    console.log("refetching");
    fetchTodos();
  }, []);

  return (
    <TodoListContext.Provider
      value={{ todos: todoList, addTodoList: handleAddTodoList }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
