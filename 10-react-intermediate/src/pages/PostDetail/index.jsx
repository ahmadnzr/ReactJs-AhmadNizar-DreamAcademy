import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { findPost } from "../../service/post";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];

  const newFormatDate = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  useEffect(() => {
    const getPost = async () => {
      const data = await findPost(id);
      setPost(data);
    };

    getPost();
  }, [id]);

  console.log(post);

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
        {post?.body?.split("\n").map((p) => (
          <Typography variant="body1" align="justify" gutterBottom>
            {p}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography variant="h4">Comments</Typography>
        <Box sx={{ marginTop: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src="https://images.ctfassets.net/1wryd5vd9xez/4DxzhQY7WFsbtTkoYntq23/a4a04701649e92a929010a6a860b66bf/https___cdn-images-1.medium.com_max_2000_1_Y6l_FDhxOI1AhjL56dHh8g.jpeg"
              alt=""
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Typography variant="subtitle1" fontWeight={"bold"}>
              Nizar | 12/29/2022 01:07:39
            </Typography>
          </Box>
          <Typography variant="body2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
            doloremque est itaque neque autem laborum aliquid. Architecto magnam
            ea minima?
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src="https://images.ctfassets.net/1wryd5vd9xez/4DxzhQY7WFsbtTkoYntq23/a4a04701649e92a929010a6a860b66bf/https___cdn-images-1.medium.com_max_2000_1_Y6l_FDhxOI1AhjL56dHh8g.jpeg"
              alt=""
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Typography variant="subtitle1" fontWeight={"bold"}>
              Nizar | 12/29/2022 01:07:39
            </Typography>
          </Box>
          <Typography variant="body2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
            doloremque est itaque neque autem laborum aliquid. Architecto magnam
            ea minima?
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4" sx={{ margin: "10px 0" }}>
          Say something
        </Typography>
        <TextField
          multiline
          minRows={5}
          sx={{ width: "100%", margin: "10px 0" }}
        />
        <Button variant="contained">Comment</Button>
      </Box>
    </Box>
  );
};

export default PostDetail;
