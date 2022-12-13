import React from "react";
import { Container, Grid } from "@material-ui/core";

import Header from "./components/Header";
import FormInput from "./components/FormInput";
import Summary from "./components/Summary";
import TodoList from "./components/TodoList";

const App = () => {
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
          <FormInput />
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
