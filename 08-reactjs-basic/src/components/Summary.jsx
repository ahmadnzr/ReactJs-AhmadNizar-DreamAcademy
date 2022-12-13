import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

const Summary = ({ todos }) => {
  const sum = todos.length;
  const onProgress = todos.filter((todo) => todo.isDone === false).length;
  const done = todos.filter((todo) => todo.isDone === true).length;

  return (
    <Grid container spacing={1} alignContent="center" wrap="wrap">
      <Grid item xs={12}>
        <Grid
          component={Paper}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h1"
            component="h1"
            style={{ fontWeight: "bold" }}
          >
            {sum}
          </Typography>
          <Typography variant="subtitle1" component="span">
            Total Task
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid
          component={Paper}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h3"
            component="h3"
            style={{ fontWeight: "bold" }}
          >
            {onProgress}
          </Typography>
          <Typography variant="subtitle1" component="span">
            In Progress
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid
          component={Paper}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h3"
            component="h3"
            style={{ fontWeight: "bold" }}
          >
            {done}
          </Typography>
          <Typography variant="subtitle1" component="span">
            Done
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Summary;
