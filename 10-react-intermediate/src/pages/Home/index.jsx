import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";

import TodoListTable from "./TodoListTable";
import ModalForm from "../../components/ModalForm";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" component={"h2"}>
          Posts
        </Typography>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Add New
        </Button>
      </Box>
      <TodoListTable />
      <ModalForm isOpen={isOpen} setOpen={setIsOpen} />
    </>
  );
};

export default Home;
