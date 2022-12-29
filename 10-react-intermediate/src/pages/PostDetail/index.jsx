import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

import { UserContext } from "../../contexts/UserContext";

import { getCommentWithPostId, postComment } from "../../service/comment";
import { findPost } from "../../service/post";

import Comments from "./Comments";
import Swal from "sweetalert2";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];

  const { selectedUser } = useContext(UserContext);

  const newFormatDate = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  const handleAddComment = async () => {
    if (comment === "") {
      Swal.fire("Error!", "Comment field is required!.", "error");
      return;
    }
    const newComment = {
      userId: selectedUser.id,
      message: comment,
      postId: parseInt(id),
      createdAt: new Date().getTime(),
    };
    await postComment(newComment);
    setComment("");
    getComment();
  };

  useEffect(() => {
    const getPost = async () => {
      const data = await findPost(id);
      setPost(data);
    };

    getPost();
  }, [id]);

  const getComment = useCallback(async () => {
    const data = await getCommentWithPostId(id);
    setComments(data);
  }, [id]);

  useEffect(() => {
    getComment();
  }, [id, getComment]);

  useEffect(() => {
    console.log(comment);
  }, [comment]);

  return (
    <Box component={"main"} sx={{ marginBottom: 20 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" component="h1">
          {post?.title}
        </Typography>
        <Typography variant="subtitle1" component="span">
          {newFormatDate(post?.createdAt)}
        </Typography>
      </Box>
      <Box sx={{ height: 350 }}>
        <img
          src="https://img.freepik.com/free-vector/black-white-grunge-paint-background_1409-1576.jpg?w=2000"
          alt="cover"
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        ></img>
      </Box>
      <Box sx={{ margin: "30px 0" }}>
        {post?.body?.split("\n").map((p, i) => (
          <Typography key={i} variant="body1" align="justify" gutterBottom>
            {p}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography variant="h4">Comments</Typography>
        {comments.map((comment, i) => (
          <Comments key={i} comment={comment} />
        ))}
      </Box>
      <Box>
        <Typography variant="h4" sx={{ margin: "10px 0" }}>
          Say something
        </Typography>
        <TextField
          multiline
          minRows={5}
          sx={{ width: "100%", margin: "10px 0" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Comment
        </Button>
      </Box>
    </Box>
  );
};

export default PostDetail;
