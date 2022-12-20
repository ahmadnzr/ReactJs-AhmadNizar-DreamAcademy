import React from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";

const Header = () => {
  const [user, setUser] = React.useState("Nizar");

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <Box sx={{ bgcolor: "#cfe8fc", height: "70px" }}>
      <Box
        component={Container}
        container
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          //   justifyContent: "space-between",
        }}
      >
        <Grid container>
          <Grid item xs={2}>
            <Typography variant="h6" component={"h1"}>
              My App
            </Typography>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            <Typography variant="subtitle" component={"span"}>
              Home
            </Typography>
            <Typography variant="subtitle" component={"span"}>
              Posts
            </Typography>
            <Typography variant="subtitle" component={"span"}>
              Users
            </Typography>
          </Grid>
        </Grid>
        <FormControl
          component={"div"}
          sx={{ m: 1, minWidth: 120, display: "flex" }}
          size="small"
        >
          <Select
            displayEmpty
            labelId="demo-select-small"
            id="demo-select-small"
            value={user}
            renderValue={() => user}
            onChange={handleChange}
          >
            <MenuItem value={"Thirty"}>Ten</MenuItem>
            <MenuItem value={"Twenty"}>Twenty</MenuItem>
            <MenuItem value={"Thirty"}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Header;
