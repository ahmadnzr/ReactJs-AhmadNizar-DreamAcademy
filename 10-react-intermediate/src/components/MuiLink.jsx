import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const MuiLink = ({ path, children }) => {
  return (
    <Link
      color="inherit"
      underline="hover"
      component={RouterLink}
      to={`${path}`}
    >
      {children}
    </Link>
  );
};

export default MuiLink;
