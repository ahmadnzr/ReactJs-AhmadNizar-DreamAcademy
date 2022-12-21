import React, { useContext, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";

import TodoListTable from "./TodoListTable";
import { TodoListContext } from "../../contexts/TodoListContext";

const Home = () => {
  const { todos } = useContext(TodoListContext);
  useEffect(() => {
    console.log(todos);
  }, [todos]);

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
        <Button variant="contained">Add New</Button>
      </Box>
      <TodoListTable rows={todos} />
    </>
  );
};

export default Home;
