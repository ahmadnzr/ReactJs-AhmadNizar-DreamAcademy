import React from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormGroup,
  FormLabel,
  IconButton,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

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

const ModalForm = ({ isOpen, setOpen }) => {
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
          <StyledBox component={"form"} sx={{ marginTop: "10px" }}>
            <FormGroup>
              <FormLabel id="post-title">Post Title</FormLabel>
              <TextField />
            </FormGroup>
            <FormGroup>
              <FormLabel id="post-title">Post Description</FormLabel>
              <TextField multiline rows={4} />
            </FormGroup>
            <FormGroup>
              <Button variant="contained">Save</Button>
            </FormGroup>
          </StyledBox>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalForm;
