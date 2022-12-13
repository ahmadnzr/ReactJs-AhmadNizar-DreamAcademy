import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch, Grid } from "@material-ui/core";

const CustomSwitch = withStyles((theme) => ({
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

const AntSwitch = ({ selected, handleChange, leftLabel, rightLabel }) => {
  return (
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>{leftLabel}</Grid>
      <Grid item>
        <CustomSwitch
          onChange={handleChange}
          checked={selected || false}
          name="status"
        />
      </Grid>
      <Grid item>{rightLabel}</Grid>
    </Grid>
  );
};

export default AntSwitch;
