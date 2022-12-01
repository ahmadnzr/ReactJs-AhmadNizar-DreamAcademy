import { getPosts, getUsers, wrapper } from "./functions.js";

$("nav select").hide();

const displayContent = wrapper(async () => {
  $("#modal-loading").show();

  const data = await Promise.all([getUsers(), getPosts()]);
  console.log(data[0]);

  $("#user-table").DataTable({
    searching: false,
    // ordering: false,
    lengthChange: false,
    pageLength: 10,
    responsive: true,
    data: data[0],
    fixedColumns: true,
    columns: [
      {
        data: "id",
        mRender: (dt, type, row, meta) => {
          return `<td>${meta.row + 1}</td>`;
        },
      },
      {
        data: "username",
        width: "25%",
      },
      {
        data: "posts",
        mRender: (dt, type, row) => {
          const post = data[1]
            .filter((post) => post.authorId == row.id)
            .map(
              (post) =>
                `<a href="blog.html?postId=${post.id}" class='detail text-green-700 hover:underline'>${post.title}</a>`
            )
            .join(", ");

          console.log(post);

          return post ? post : "-";
        },
      },
    ],
  });

  $("#modal-loading").hide();
});

displayContent();
