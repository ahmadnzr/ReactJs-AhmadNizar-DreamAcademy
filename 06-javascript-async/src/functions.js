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

const getUsers = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "get",
      url: BASE_URL + "users",
    })
      .done((res) => {
        resolve(res);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "get",
      url: BASE_URL + "users/" + userId,
    })
      .done((res) => resolve(res))
      .fail((err) => reject(err));
  });
};

const getPost = (postId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "get",
      url: BASE_URL + "posts/" + postId,
    })
      .done((res) => resolve(res))
      .fail((err) => reject(err));
  });
};

const getPosts = () => {
  const posts = new Promise((resolve, reject) => {
    $.ajax({
      url: BASE_URL + "posts",
      type: "get",
    })
      .done((res) => {
        resolve(res);
      })
      .fail((err) => {
        reject(err);
      });
  });

  return posts;
};

const createPost = ({ title, body, published }) => {
  return new Promise((resolve, reject) => {
    if (!title || !body) {
      reject("There is an error while creating the post");
    }

    const authorId = parseInt($("#user-list").val());

    $.ajax({
      url: BASE_URL + "posts",
      type: "post",
      contentType: "application/json",
      data: JSON.stringify({
        title,
        body,
        published,
        authorId,
        createdAt: new Date().getTime(),
        lastModified: new Date().getTime(),
      }),
    })
      .done(() => {
        resolve("Post successfully created!");
      })
      .fail(() => {
        reject("There is an error while creating the post");
      });
  });
};

const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "delete",
      url: BASE_URL + "posts/" + postId,
    })
      .done((res) => resolve(res))
      .fail((err) => reject(err));
  });
};

const updatePost = ({ postId, title, body, published }) => {
  return new Promise((resolve, reject) => {
    if (!title || !body || !postId) {
      reject("There is an error while updating the post");
    }

    $.ajax({
      url: BASE_URL + "posts/" + postId,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify({
        title,
        body,
        published,
        lastModified: new Date().getTime(),
      }),
    })
      .done(() => {
        resolve("Post successfully edited!");
      })
      .fail(() => {
        reject("There is an error while updating the post");
      });
  });
};

const getCommentByPostId = (postId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "get",
      url: BASE_URL + "comments/?postId=" + postId,
    })
      .done((res) => resolve(res))
      .fail((err) => reject(err));
  });
};

const createComment = ({ message, postId, userId }) => {
  return new Promise((resolve, reject) => {
    if (!message || !postId || !userId) {
      return reject("There is an error when creating the comment");
    }

    $.ajax({
      url: BASE_URL + "comments",
      type: "post",
      contentType: "application/json",
      data: JSON.stringify({
        message,
        postId,
        userId,
        createdAt: new Date().getTime(),
      }),
    })
      .done(() => {
        resolve("Post successfully created!");
      })
      .fail((err) => {
        reject("There is an error while creating the post", err);
      });
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
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
  updatePost
};
