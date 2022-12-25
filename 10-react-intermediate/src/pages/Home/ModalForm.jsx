import React, { useContext, useState } from "react";
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

import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../../contexts/UserContext";

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

const ModalForm = ({ isOpen, setOpen, saveTodo }) => {
  const [newTodo, setNewTodo] = useState({
    isForEdit: false,
    todo: {
      title: "",
      body: "",
      published: false,
    },
  });

  const { selectedUser } = useContext(UserContext);

  const inputChange = (e) => {
    const key = e.target.name;
    setNewTodo((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        [key]: key === "published" ? e.target.checked : e.target.value,
      },
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const todo = {
      ...newTodo.todo,
      createdAt: new Date().getTime(),
      lastModified: new Date().getTime(),
      authorId: selectedUser.id,
    };

    try {
      await saveTodo(todo);
    } catch (error) {
      console.log("error", error.message);
    }
  };

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
            onClick={() => setOpen(false)}
          >
            <CloseIcon color="error" />
          </IconButton>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Tambah Post
          </Typography>
          <StyledBox
            component={"form"}
            onSubmit={onSubmitForm}
            sx={{ marginTop: "10px" }}
          >
            <FormGroup>
              <FormLabel id="post-title">Post Title</FormLabel>
              <TextField
                value={newTodo.todo.title}
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
                value={newTodo.todo.body}
                onChange={inputChange}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Switch />}
                label="Publish"
                checked={newTodo.todo.published}
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
