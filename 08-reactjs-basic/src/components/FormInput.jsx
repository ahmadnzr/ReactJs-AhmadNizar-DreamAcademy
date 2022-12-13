import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Grid, Paper } from "@material-ui/core";

import AntSwitch from "./AntSwitch";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    gap: theme.spacing(2),
  },
  title: {
    marginBottom: "10px",
  },
}));

const FormInput = ({ todos, addTodo }) => {
  const [todo, setTodo] = useState({});
  const [error, setError] = useState(false);

  const classes = useStyles();

  const handleChange = (e) => {
    const id = todos[todos.length - 1]?.id + 1 || 1;
    const title = e.target.name === "title" ? e.target.value : todo.title;
    const isDone =
      e.target.name === "status" ? e.target.checked : todo.isDone || false;

    const newTodo = {
      id,
      title,
      isDone,
      createdAt: new Date().getTime(),
    };

    setTodo((prev) => {
      return { ...prev, ...newTodo };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.title === "" || typeof todo.title === "undefined") {
      setError(true);
      return;
    }
    addTodo(todo);
    setTodo({ title: "", isDone: false });
  };

  return (
    <Grid container component={Paper} style={{ height: "100%", padding: 10 }}>
      <Grid item xs={12}>
        <Typography variant="h5" component={"h2"} className={classes.title}>
          Input your task!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form
          onSubmit={handleSubmit}
          action=""
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <TextField
            error={error}
            id="outlined-error"
            label="Title"
            variant="outlined"
            name="title"
            value={todo?.title || ""}
            onChange={handleChange}
            autoFocus
          />
          <AntSwitch
            selected={todo?.isDone}
            handleChange={handleChange}
            leftLabel="In Progress"
            rightLabel="Done"
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default FormInput;
