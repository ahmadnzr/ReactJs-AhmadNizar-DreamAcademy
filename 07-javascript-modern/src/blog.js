import {wrapper,getCommentByPostId,formatDate, getPost, getUser,createComment} from './functions.js'

const postTitle = $("#post-title");
const postDetail = $("#post-detail");
const postBody = $("#post-body");
const postComment = $("#post-comments");

const newFormatDate = (date) => {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
  }).format(date);
};

const createCommentElement = ({ avatar, username, message, createdAt }) => {
  const messages = message
    .split("\n")
    .map((p) => {
      return `<p>${p}<p/>`;
    })
    .join("");

  return `
    <div class="flex flex-col gap-2 text-sm">
        <div class="flex items-center justify-start space-x-3">
            <img
                src="${avatar}"
                alt=""
                class="h-10 w-10 rounded-full object-cover"
            />
            <strong>${username} | ${createdAt}</strong>
        </div>
        "${messages}"
    </div>
`;
};

const displayContent = wrapper(async () => {
  const postId = document.URL.split("#")[1];

  const post = await getPost(postId);
  const author = await getUser(post.authorId);
  const postcontent = post.body.split("\n").map((p) => {
    return `<p class="text-justify">${p}</>`;
  });

  postTitle.html(post.title);
  postDetail.html(`By ${author.username} : ${newFormatDate(post.createdAt)}`);
  postBody.html(postcontent);

  const comments = await getCommentByPostId(postId);

  comments.map(async (comment) => {
    console.log(comment.id);
    const userComment = await getUser(comment.userId);
    const commentEl = createCommentElement({
      avatar: userComment.avatar,
      username: userComment.username,
      message: comment.message,
      createdAt: formatDate(comment.createdAt),
    });
    postComment.append(commentEl);
  });
  $("#modal-loading").hide();
});

$("#form-comment").submit(async (e) => {
  const message = $("#message").val();
  const postId = document.URL.split("#")[1];
  const userId = JSON.parse(localStorage.getItem("currentUser")).id;

  await createComment({ message, postId, userId });
  window.location.reload();
});

displayContent();
