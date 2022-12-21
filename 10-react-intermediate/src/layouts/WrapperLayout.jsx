import React from "react";
import { Container } from "@mui/material";

import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const WrapperLayout = () => {
  return (
    <>
      <Header />
      <Container sx={{ paddingTop: "20px" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default WrapperLayout;
