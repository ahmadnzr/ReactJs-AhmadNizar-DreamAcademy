import React, { useReducer, useState } from "react";
import { Container, createTheme, Grid, ThemeProvider } from "@material-ui/core";

import Header from "./components/Header";
import FormInput from "./components/FormInput";
import Summary from "./components/Summary";
import TodoList from "./components/TodoList";

import { newTodoReducer, initialTodo } from "./reducers/todo";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [newTodo, dispatch] = useReducer(newTodoReducer, initialTodo);

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
            <FormInput newTodo={newTodo} dispatchOnChange={dispatch} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Summary todos={[]} />
          </Grid>
        </Grid>
        <TodoList dispatchOnChange={dispatch} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
