import React from "react";
import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal as MuiModal,
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

const Modal = ({ isOpen, setOpen, children }) => {
  return (
    <MuiModal
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
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
