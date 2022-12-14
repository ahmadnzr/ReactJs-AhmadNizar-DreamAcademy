import React, { useState } from "react";
import { Container, createTheme, Grid, ThemeProvider } from "@material-ui/core";

import Header from "./components/Header";
import FormInput from "./components/FormInput";
import Summary from "./components/Summary";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [isForEdit, setIsForEdit] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const id = todos[todos.length - 1]?.id + 1 || 1;

  const addTodo = (newTodo) => {
    setTodos((todo) => [...todo, { ...newTodo, id }]);
  };

  const editTodo = (todoId) => {
    const indexEdit = todos.findIndex((todo) => todo.id === todoId);
    const newTodos = todos;
    newTodos[indexEdit] = { ...todo, id: todoId };
    setTodos(newTodos);
  };

  const deleteTodo = (todoId) => {
    const filteredTodo = todos.filter((todo) => todo.id !== todoId);
    setTodos(filteredTodo);
  };

  const findTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setTodo(todo);
    setIsForEdit(true);
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: isDark ? "dark" : "light",
        },
      }),
    [isDark]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Header setIsDark={setIsDark} />
        <Grid
          container
          justifyContent="space-between"
          spacing={4}
          wrap="wrap-reverse"
        >
          <Grid item xs={12} sm={6}>
            <FormInput
              todos={todos}
              addTodo={addTodo}
              editTodo={editTodo}
              todo={todo}
              setTodo={setTodo}
              isForEdit={isForEdit}
              setIsForEdit={setIsForEdit}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Summary todos={todos} />
          </Grid>
        </Grid>
        <TodoList todos={todos} deleteTodo={deleteTodo} findTodo={findTodo} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
