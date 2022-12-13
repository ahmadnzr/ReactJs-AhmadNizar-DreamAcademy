import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

const Summary = () => {
  return (
    <Grid
      container
      //   style={{ height: "100%", backgroundColor: "red" }}
      spacing={1}
      alignContent="center"
      //   wrap="wrap"
    >
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
            10
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
            4
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
            6
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
