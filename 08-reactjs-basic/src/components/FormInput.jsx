import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";

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

const FormInput = () => {
  const [done, setDone] = useState(false);
  const classes = useStyles();

  const handleChange = () => {
    setDone(!done);
  };
  return (
    <Grid container component={Paper} style={{ height: "100%", padding: 10 }}>
      <Grid item xs={12}>
        <Typography variant="h5" component={"h2"} className={classes.title}>
          Input your task!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form action="" className={classes.form} noValidate autoComplete="off">
          <TextField
            // error
            id="outlined-error"
            label="Title"
            variant="outlined"
          />
          <AntSwitch
            selected={done}
            handleChange={handleChange}
            leftLabel="In Progress"
            rightLabel="Done"
          />
          <Button variant="contained">Create</Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default FormInput;
