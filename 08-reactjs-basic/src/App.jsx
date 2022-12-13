import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";

import Header from "./components/Header";
import FormInput from "./components/FormInput";
import Summary from "./components/Summary";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos((todo) => [...todo, newTodo]);
  };

  return (
    <Container maxWidth="md">
      <Header />
      <Grid
        container
        justifyContent="space-between"
        spacing={4}
        wrap="wrap-reverse"
      >
        <Grid item xs={12} sm={6}>
          <FormInput todos={todos} addTodo={addTodo} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Summary />
        </Grid>
      </Grid>
      <TodoList />
    </Container>
  );
};

export default App;
