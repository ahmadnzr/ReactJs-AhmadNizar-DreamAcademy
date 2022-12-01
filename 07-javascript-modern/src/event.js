import displayDetailPage from "./detail.js";
import { createPost, deletePost, getPost, updatePost } from "./functions.js";
import displayHomePage from "./main.js";

$("#root").on("click", "#add-post", () => {
  console.log("masuuuuuk");
  $("#modal").show();
  $("#modal").removeClass("edit");
  $("#modal-title").html("Add New Post");
  $("#title").val("").focus();
  $("#body").val("");
  $("#publish").prop("checked", false);
});

$("#close-modal").click(function () {
  $("#modal").hide();
});

$("#modal-form").submit(async (e) => {
  e.preventDefault();
  $("#modal").hide();
  $("#modal-loading").show();

  const title = $("#title").val();
  const body = $("#body").val();
  const published = $("#publish").prop("checked");

  const isForEdit = $("#modal").prop("class").split(" ").includes("edit");

  if (isForEdit) {
    await updatePost({ title, body, published, postId: $("#postId").html() });
    await displayHomePage();

    return;
  }

  await createPost({ title, body, published });
  await displayHomePage();
});

$("#root").on("click", ".delete", async (e) => {
  const id = e.target.id.split("-")[1];
  if (confirm("Are you sure to delete post with id = " + id + "?")) {
    await deletePost(id);
  }
  await displayHomePage();

  return;
});

$("#root").on("click", ".edit", async (e) => {
  const id = e.target.id.split("-")[1];
  const post = await getPost(id);

  $("#modal").show();
  $("#modal").addClass("edit");
  $("#modal-title").html(`Edit post with id <span id="postId">${id}</span>`);
  $("#title").val(post.title);
  $("#body").val(post.body);
  $("#publish").prop("checked", post.published);
});

$("#root").on("click", ".detail", async (e) => {
  const id = e.target.id.split("-")[1];
  const post = await getPost(id);
  const data = {
    page: "detail",
    post,
  };
  displayDetailPage(data);
  history.pushState(data, "", "/detail?postId=" + id);
});

$(window).on("popstate", async (e) => {
  const state = e.originalEvent.state;
  console.log(state);
  if (state.page == "home") {
    console.log("to home");
    await displayHomePage();
  } else {
    console.log("to detail");
    await displayDetailPage({ post: state.post });
  }
});
