import React, { useState } from "react";
import { Container, createTheme, Grid, ThemeProvider } from "@material-ui/core";

import Header from "./components/Header";
import FormInput from "./components/FormInput";
import Summary from "./components/Summary";
import TodoList from "./components/TodoList";

import { useForm } from "./hooks/useForm";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const { todo, onChangeInput, onSubmitForm, onEditForm, resetForm } =
    useForm();

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
              todo={todo}
              onChangeInput={onChangeInput}
              onSubmitForm={onSubmitForm}
              resetForm={resetForm}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Summary todos={[]} />
          </Grid>
        </Grid>
        <TodoList onClickEdit={onEditForm} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
