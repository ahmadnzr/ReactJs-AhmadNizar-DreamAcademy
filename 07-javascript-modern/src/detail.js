import createDetailPage from "./content/detail.js";
import {
  wrapper,
  getCommentByPostId,
  formatDate,
  getPost,
  getUser,
  createComment,
  getCurrentUser,
} from "./functions.js";

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
        ${messages}
    </div>
`;
};

const displayDetailPage = wrapper(async ({ post }) => {
  createDetailPage();
  const postTitle = $("#post-title");
  const postDetail = $("#post-detail");
  const postBody = $("#post-body");
  const postComment = $("#post-comments");

  const author = await getUser(post.authorId);
  const postcontent = post.body.split("\n").map((p) => {
    return `<p class="text-justify">${p}</>`;
  });

  postTitle.html(post.title);
  postDetail.html(`By ${author.username} : ${newFormatDate(post.createdAt)}`);
  postBody.html(postcontent);

  const comments = await getCommentByPostId(post.id);

  comments.map(async (comment) => {
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

$("#root").on("submit", "#form-comment", async (e) => {
  e.preventDefault();
  const message = $("#message").val();
  const postId = new URLSearchParams(window.location.search).get("postId");
  const user = await getCurrentUser();

  postId;
  await createComment({ message, postId, userId: user.id });
  // window.location.reload();
});

export default displayDetailPage;
