import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Switch } from "@material-ui/core";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const Header = () => {
  const [dark, setDark] = useState(false);

  const handleChange = (e) => {
    setDark(e.target.checked);
  };
  return (
    <Grid
      container
      component="div"
      justifyContent="space-between"
      alignItems="center"
      style={{ padding: "10px 0 10px 0" }}
    >
      <Box>
        <Typography
          variant={"h3"}
          component={"h2"}
          style={{ fontWeight: "bold" }}
        >
          Todo List App
        </Typography>
        <Typography variant="subtitle1">Create your daily task!</Typography>
      </Box>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Light</Grid>
          <Grid item>
            <AntSwitch checked={dark} onChange={handleChange} name="checkedC" />
          </Grid>
          <Grid item>Dark</Grid>
        </Grid>
      </Typography>
    </Grid>
  );
};

export default Header;
