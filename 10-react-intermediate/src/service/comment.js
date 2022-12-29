import axios from "axios";
import { BASE_URL } from "./post";

const getCommentWithPostId = async (postId) => {
  try {
    const res = await axios({
      method: "get",
      url: BASE_URL + "/comments?postId=" + postId,
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
};

const postComment = async (comment) => {
  try {
    await axios({
      method: "post",
      url: BASE_URL + "/comments",
      data: comment,
    });
  } catch (error) {
    return error.message;
  }
};

export { getCommentWithPostId, postComment };
