import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import AntSwitch from "./AntSwitch";

const Header = ({ isDark, setIsDark }) => {
  return (
    <Grid
      container
      component="div"
      justifyContent="space-between"
      alignItems="center"
      style={{ padding: "10px 0 50px 0" }}
    >
      <Box>
        <Typography
          variant={"h3"}
          component={"h1"}
          style={{ fontWeight: "bold" }}
        >
          Todo List App
        </Typography>
        <Typography variant="subtitle1">Create your daily task!</Typography>
      </Box>
      <Typography component="div">
        <AntSwitch
          selected={isDark}
          handleChange={(e) => setIsDark(e.target.checked)}
          leftLabel="Light"
          rightLabel="Dark"
        />
      </Typography>
    </Grid>
  );
};

export default Header;
