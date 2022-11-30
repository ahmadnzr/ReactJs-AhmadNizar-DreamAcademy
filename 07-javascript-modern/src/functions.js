const BASE_URL = "http://localhost:3000/";

const wrapper = (callback) => {
  try {
    return callback;
  } catch (err) {
    console.log(err);
  }
};

const formatDate = (date) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })
    .format(newDate)
    .split(",")
    .join(" ");
};

const getUsers = wrapper(async () => {
  const res = await fetch(BASE_URL + "users");
  const users = await res.json();
  return users;
});

const getUser = wrapper(async (userId) => {
  const res = await fetch(BASE_URL + "users/" + userId);
  const user = await res.json();
  return user;
});

const getPost = wrapper(async (postId) => {
  const res = await fetch(BASE_URL + "posts/" + postId);
  const post = await res.json();
  return post;
});

const getPosts = wrapper(async () => {
  const res = await fetch(BASE_URL + "posts/");
  const posts = await res.json();
  return posts;
});

const createPost = wrapper(async ({ title, body, published }) => {
  if (!title || !body) {
    throw new Error("There is an error while creating the post");
  }
  const authorId = parseInt($("#user-list").val());

  return await fetch(BASE_URL + "posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
      published,
      authorId,
      createdAt: new Date().getTime(),
      lastModified: new Date().getTime(),
    }),
  });
});

const deletePost = wrapper(async (postId) => {
  if (!postId) {
    throw new Error("There is an error while deleting the post");
  }

  return await fetch(BASE_URL + "posts/" + postId, { method: "DELETE" });
});

const updatePost = wrapper(async ({ postId, title, body, published }) => {
  if (!title || !body || !postId) {
    throw new Error("There is an error while updating the post");
  }

  return await fetch(BASE_URL + "posts/" + postId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
      published,
      lastModified: new Date().getTime(),
    }),
  });
});

const getCommentByPostId = wrapper(async (postId) => {
  if (!postId) {
    throw new Error("Required for postId");
  }
  const res = await fetch(BASE_URL + "comments/?postId=" + postId);
  const comment = await res.json();

  return comment;
});

const createComment = wrapper(async ({ message, postId, userId }) => {
  if (!message || !postId || !userId) {
    throw new Error("There is an error when creating the comment");
  }

  return await fetch(BASE_URL + "comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      postId,
      userId,
      createdAt: new Date().getTime(),
    }),
  });
});

const getCurrentUser = async () => {
  const user = await getUser(1);

  return JSON.parse(localStorage.getItem("currentUser")) || user;
};

export {
  wrapper,
  formatDate,
  getCommentByPostId,
  getCurrentUser,
  getPost,
  getPosts,
  getUser,
  getUsers,
  createComment,
  createPost,
  deletePost,
  updatePost,
};
