import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";

import { formatDate } from "../../utils/formatDate";
import { UserContext } from "../../contexts/UserContext";

const Comments = ({ comment }) => {
  const { data } = useContext(UserContext);
  const user = data.find((user) => user.id === comment.userId);

  return (
    <Box sx={{ marginTop: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img
          src={`${user.avatar}`}
          alt=""
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Typography variant="subtitle1" fontWeight={"bold"}>
          {user.username} | {formatDate(comment.createdAt)}
        </Typography>
      </Box>
      <Typography variant="body2">{comment.message}</Typography>
    </Box>
  );
};

export default Comments;
