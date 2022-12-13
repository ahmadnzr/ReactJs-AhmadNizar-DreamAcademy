import React, { useState } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import AntSwitch from "./AntSwitch";

const Header = () => {
  const [dark, setDark] = useState(true);

  const handleChange = (e) => {
    setDark(e.target.checked);
  };
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
          selected={dark}
          handleChange={handleChange}
          leftLabel="Light"
          rightLabel="Dark"
        />
      </Typography>
    </Grid>
  );
};

export default Header;
