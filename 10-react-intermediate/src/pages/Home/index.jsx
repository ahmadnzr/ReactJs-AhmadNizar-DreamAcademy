import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, Box, Button } from "@mui/material";

import ModalForm from "./ModalForm";
import { fetchPosts } from "../../service/post";
import PostListTable from "./PostListTable";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [forEdit, setForEdit] = useState(null);
  const dispatch = useDispatch();

  const handleEditForm = (id) => {
    setForEdit(id);
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(fetchPosts());
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
      <PostListTable handleEditForm={handleEditForm} />
      <ModalForm
        isOpen={isOpen}
        setOpen={setIsOpen}
        forEdit={forEdit}
        setForEdit={setForEdit}
      />
    </>
  );
};

export default Home;
