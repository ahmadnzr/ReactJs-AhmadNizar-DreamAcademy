import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Grid, Paper } from "@material-ui/core";

import AntSwitch from "./AntSwitch";
import { actionType } from "../reducers/actionType";

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

const FormInput = ({
  addTodo,
  editTodo,
  todo,
  dispatch,
  isForEdit,
  setIsForEdit,
}) => {
  const [error, setError] = useState(false);

  const classes = useStyles();

  const resetValue = () => {
    dispatch({ type: actionType.RESET_VALUE });
    setIsForEdit(false);
  };

  const handleChange = ({ key, value }) => {
    dispatch({
      type: actionType.INPUT_CHANGE,
      payload: {
        key,
        value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.title === "" || typeof todo.title === "undefined") {
      setError(true);
      return;
    }
    if (isForEdit) {
      editTodo(todo.id);
    } else {
      addTodo();
    }

    resetValue();
  };

  return (
    <Grid container component={Paper} style={{ height: "100%", padding: 10 }}>
      <Grid item xs={12}>
        <Typography variant="h5" component={"h2"} className={classes.title}>
          {isForEdit ? "Edit" : "Input your task!"}
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
            required
            id="outlined-error"
            label="Title"
            variant="outlined"
            name="title"
            value={todo.title}
            onChange={(e) =>
              handleChange({ key: "title", value: e.target.value })
            }
            autoFocus
          />
          <AntSwitch
            selected={todo?.isDone}
            handleChange={(e) =>
              handleChange({ key: "isDone", value: e.target.checked })
            }
            leftLabel="In Progress"
            rightLabel="Done"
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
          {isForEdit ? (
            <Button onClick={resetValue} variant="contained">
              Cancel Edit
            </Button>
          ) : null}
        </form>
      </Grid>
    </Grid>
  );
};

export default FormInput;
