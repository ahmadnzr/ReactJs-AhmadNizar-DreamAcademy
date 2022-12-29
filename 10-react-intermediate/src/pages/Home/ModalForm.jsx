import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Modal,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import CloseIcon from "@mui/icons-material/Close";

import { UserContext } from "../../contexts/UserContext";

import { addPost, editPost, findPost } from "../../service/post";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const StyledBox = styled(Box)(({ theme }) => ({
  "& > *": {
    marginTop: theme.spacing(2),
  },
}));

const ModalForm = ({ isOpen, setOpen, forEdit, setForEdit }) => {
  const [newTodo, setNewTodo] = useState({
    title: "",
    body: "",
    published: false,
  });

  const { selectedUser } = useContext(UserContext);
  const dispatch = useDispatch();

  const inputChange = (e) => {
    const key = e.target.name;
    setNewTodo((prev) => ({
      ...prev,
      [key]: key === "published" ? e.target.checked : e.target.value,
    }));
  };

  const handleCreateDummyPost = () => {
    const title = faker.lorem.sentence(Math.ceil(Math.random() * 3 + 1));
    const body = faker.lorem.paragraphs(Math.ceil(Math.random() * 5 + 1), "\n");

    setNewTodo({
      title,
      body,
      published: false,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const todo = {
      ...newTodo,
      authorId: selectedUser.id,
    };

    if (forEdit) {
      dispatch(
        editPost({ ...todo, lastModified: new Date().getTime() }, forEdit)
      );
    } else {
      dispatch(
        addPost({
          ...todo,
          createdAt: new Date().getTime(),
          lastModified: new Date().getTime(),
        })
      );
    }
    resetInput();
    setOpen(false);
    setForEdit(null);
  };

  const resetInput = () => {
    setForEdit(null);
    setNewTodo({
      title: "",
      body: "",
      published: false,
    });
  };

  const handleCloseButton = () => {
    setOpen(false);
    resetInput();
  };

  useEffect(() => {
    const getPost = async () => {
      if (forEdit) {
        const data = await findPost(forEdit);
        setNewTodo(data);
      }
    };

    getPost();
  }, [forEdit]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      //   onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 4, right: 4 }}
            onClick={handleCloseButton}
          >
            <CloseIcon color="error" />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {typeof forEdit === "number"
                ? "Edit Post :" + forEdit
                : "Tambah Post"}
            </Typography>
            {typeof forEdit !== "number" ? (
              <Button size="small" onClick={handleCreateDummyPost}>
                Create dummy post
              </Button>
            ) : null}
          </Box>

          <StyledBox
            component={"form"}
            onSubmit={onSubmitForm}
            sx={{ marginTop: "10px" }}
          >
            <FormGroup>
              <FormLabel id="post-title">Post Title</FormLabel>
              <TextField
                value={newTodo.title}
                name="title"
                onChange={inputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel id="post-title">Post Description</FormLabel>
              <TextField
                multiline
                rows={4}
                name="body"
                value={newTodo.body}
                onChange={inputChange}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Switch />}
                label="Publish"
                checked={newTodo.published}
                name="published"
                onChange={inputChange}
              />
            </FormGroup>
            <FormGroup>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </FormGroup>
          </StyledBox>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalForm;
