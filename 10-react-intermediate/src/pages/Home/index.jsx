import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, Box, Button } from "@mui/material";

import ModalForm from "./ModalForm";
import { fetchTodos } from "../../service/post";
import PostListTable from "./PostListTable";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

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
      <PostListTable />
      <ModalForm isOpen={isOpen} setOpen={setIsOpen} saveTodo={() => {}} />
    </>
  );
};

export default Home;
