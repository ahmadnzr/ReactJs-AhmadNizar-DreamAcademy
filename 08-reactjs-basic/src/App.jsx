import React, { useState, useReducer } from "react";
import { Container, createTheme, Grid, ThemeProvider } from "@material-ui/core";

import Header from "./components/Header";
import FormInput from "./components/FormInput";
import Summary from "./components/Summary";
import TodoList from "./components/TodoList";

import { initialTodoList, todoReducer } from "./reducers/todoListReducer";
import { formReducer, initialTodo } from "./reducers/FormReducer";
import { actionType } from "./reducers/actionType";

const App = () => {
  const [isForEdit, setIsForEdit] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [todoList, todoListDispatch] = useReducer(todoReducer, initialTodoList);
  const [todo, formDispatch] = useReducer(formReducer, initialTodo);

  const addTodo = () => {
    todoListDispatch({ type: actionType.ADD_TODO, payload: todo });
  };

  const editTodo = (id) => {
    todoListDispatch({
      type: actionType.EDIT_TODO,
      payload: { editId: id, todo },
    });
  };

  const findTodo = (id) => {
    const findTodo = todoList.find((todo) => todo.id === id);
    formDispatch({ type: actionType.SET_TODO, payload: findTodo });
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
              todos={todoList}
              addTodo={addTodo}
              editTodo={editTodo}
              todo={todo}
              dispatch={formDispatch}
              isForEdit={isForEdit}
              setIsForEdit={setIsForEdit}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Summary todos={todoList} />
          </Grid>
        </Grid>
        <TodoList
          todos={todoList}
          dispatch={todoListDispatch}
          findTodo={findTodo}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
