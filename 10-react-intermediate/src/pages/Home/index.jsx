import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";

import TodoListTable from "./TodoListTable";
import ModalForm from "../../components/ModalForm";
import { addTodo, fetchTodos } from "../../service/todo";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const saveTodo = async (todo) => {
    try {
      await addTodo(todo);
      await fetchTodoList();
      setIsOpen(false);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const fetchTodoList = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" component={"h2"}>
          Posts
        </Typography>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Add New
        </Button>
      </Box>
      <TodoListTable todos={todos} />
      <ModalForm isOpen={isOpen} setOpen={setIsOpen} saveTodo={saveTodo} />
    </>
  );
};

export default Home;
