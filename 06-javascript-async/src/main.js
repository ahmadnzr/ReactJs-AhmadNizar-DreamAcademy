import {
  wrapper,
  getUsers,
  getPosts,
  formatDate,
  createPost,
  updatePost,
  deletePost,
  getPost,
} from "./functions.js";

const displayContent = wrapper(async () => {
  $("#modal-loading").show();

  const data = await Promise.all([getUsers(), getPosts()]);

  $("#post-table").DataTable({
    searching: false,
    // ordering: false,
    lengthChange: false,
    pageLength: 10,
    responsive: true,
    data: data[1],
    fixedColumns: true,
    columns: [
      {
        data: "id",
        mRender: (dt, type, row, meta) => {
          return `<td>${meta.row + 1}</td>`;
        },
      },
      {
        data: "title",
        mRender: (dt, type, row, meta) => {
          return `<a href="blog.html?postId=${row.id}" class='detail text-green-700 hover:underline'>${row.title}</a>`;
        },
        width: "25%",
      },
      {
        data: "authorId",
        mRender: (dt, type, row) => {
          const user = data[0].find((user) => user.id == row.authorId).username;
          return user;
        },
      },
      {
        data: "createdAt",
        mRender: (dt, type, row) => {
          return `${formatDate(row.createdAt)}`;
        },
      },
      {
        data: "lastModified",
        mRender: (dt, type, row) => {
          return `${formatDate(row.lastModified)}`;
        },
      },
      {
        data: "published",
        mRender: (dt, type, row) => {
          return row.published
            ? "<span class='h-5 w-5 inline-flex items-center justify-center rounded-full bg-green-100'><i class='text-green-900 fa fa-check'></i></span>"
            : "<span class='h-5 w-5 inline-flex items-center justify-center rounded-full bg-red-100'><i class='text-red-900 fa-sharp fa-solid fa-xmark'></i></span>";
        },
        className: "dt-body-center",
      },
      {
        data: "action",
        mRender: (dt, type, row) => {
          if ($("#user-list").val() == row.authorId) {
            return `<button class="edit bg-yellow-100 hover:bg-yellow-200 px-2 py-1 text-xs rounded-sm" id="edit-${row.id}">[Edit]</button>
            <button class="delete bg-red-100 px-2 hover:bg-red-200 py-1 text-xs rounded-sm" id="delete-${row.id}">[Hapus]</button>`;
          }

          return `<span class='text-xs'>Not Allowed</span>`;
        },
        className: "action",
      },
    ],
  });

  $("#modal-loading").hide();
});

displayContent();

$("#modal-form").submit(
  wrapper(async (e) => {
    // e.preventDefault();
    $("#modal").hide();
    $("#modal-loading").show();

    const title = $("#title").val();
    const body = $("#body").val();
    const published = $("#publish").prop("checked");

    const isForEdit = $("#modal").prop("class").split(" ").includes("edit");

    if (isForEdit) {
      await updatePost({ title, body, published, postId: $("#postId").html() });
      return;
    }

    await createPost({ title, body, published });
  })
);

$("#post-table").on("click", ".delete", async (e) => {
  const id = e.target.id.split("-")[1];
  if (confirm("Are you sure to delete post with id = " + id + "?")) {
    await deletePost(id);
    window.location.reload();
  }
  return;
});

$("#post-table").on("click", ".edit", async (e) => {
  const id = e.target.id.split("-")[1];
  const post = await getPost(id);

  $("#modal").show();
  $("#modal").addClass("edit");
  $("#modal-title").html(`Edit post with id <span id="postId">${id}</span>`);
  $("#title").val(post.title);
  $("#body").val(post.body);
  $("#publish").prop("checked", post.published);
});
