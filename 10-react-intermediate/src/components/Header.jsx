import React, { useContext } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { UserContext } from "../contexts/UserContext";
import MuiLink from "./MuiLink";

const Header = () => {
  const { data, selectedUser, handleSelectUser } = useContext(UserContext);

  const handleChangeUser = (e) => {
    handleSelectUser(e.target.value);
  };

  return (
    <Box sx={{ bgcolor: "#cfe8fc", height: "70px" }}>
      <Box
        component={Container}
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
            <MuiLink path={"/"}>
              <Typography variant="subtitle">Home</Typography>
            </MuiLink>
            <MuiLink path={"users"}>
              <Typography variant="subtitle" component={"span"}>
                Users
              </Typography>
            </MuiLink>
          </Grid>
        </Grid>
        <FormControl
          component={"div"}
          sx={{ m: 1, minWidth: 120, display: "flex" }}
          size="small"
        >
          <Select
            displayEmpty
            value={selectedUser?.id || 1}
            onChange={handleChangeUser}
          >
            {data.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Header;
