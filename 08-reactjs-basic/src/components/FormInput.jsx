import React, { useState } from "react";
import { TextField, Typography, Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const FormInput = ({ todo, onChangeInput, onSubmitForm, resetForm }) => {
  const [error, setError] = useState(false);
  const {
    isForEdit,
    todo: { title, isDone },
  } = todo;

  const classes = useStyles();

  const handleChange = ({ key, value }) => {
    onChangeInput(key, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || typeof title === "undefined") {
      setError(true);
      return;
    }

    onSubmitForm();
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
            value={title}
            onChange={(e) =>
              handleChange({ key: "title", value: e.target.value })
            }
            autoFocus
          />
          <AntSwitch
            selected={isDone}
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
            <Button onClick={() => resetForm()} variant="contained">
              Cancel Edit
            </Button>
          ) : null}
        </form>
      </Grid>
    </Grid>
  );
};

export default FormInput;
