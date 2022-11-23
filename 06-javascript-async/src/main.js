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

const displayContent = wrapper(async () => {
  $("#modal-loading").show();

  const data = await Promise.all([getUsers(), getPosts()]);

  const currentUserId =
    JSON.parse(localStorage.getItem("currentUserId")) || null;

  data[0].map((user) => {
    const selected = user.id == currentUserId ? "selected" : null;
    const option = `<option value='${user.id}' ${selected}>${user.username}</option>`;
    $("#user-list").append(option);
  });

  const table = $("#post-table").DataTable({
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
          return `<a href="#${row.id}" class='text-green-700 hover:underline'>${row.title}</a>`;
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
            return `<button class="bg-yellow-100 hover:bg-yellow-200 px-2 py-1 text-xs rounded-sm">[Edit]</button>
            <button class="delete bg-red-100 px-2 hover:bg-red-200 py-1 text-xs rounded-sm" id="${row.id}">[Hapus]</button>`;
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

$("#user-list").change((e) => {
  localStorage.setItem("currentUserId", JSON.stringify(e.target.value));
  window.location.reload();
});

$("#modal-form").submit(
  wrapper(async () => {
    $("#modal").hide();
    $("#modal-loading").show();

    const title = $("#title").val();
    const body = $("#body").val();
    const published = $("#publish").prop("checked");

    await createPost({ title, body, published });
  })
);

$("#post-table").on("click", ".delete", async (e) => {
  if (confirm("Are you sure to delete post with id = " + e.target.id + "?")) {
    await deletePost(e.target.id);
    window.location.reload();
  }
  return;
});
