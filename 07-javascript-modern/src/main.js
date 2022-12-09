import createHomePage from "./content/home.js";
import { getUsers, getPosts, formatDate, getCurrentUser } from "./functions.js";

const displayHomePage = async () => {
  $("#modal-loading").show();
  createHomePage();

  const data = await Promise.all([getUsers(), getPosts()]);
  const currentUser = await getCurrentUser();

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
          // return `<td>${meta.row + 1}</td>`;
          return `<td>${row.id}</td>`;
        },
      },
      {
        data: "title",
        mRender: (dt, type, row, meta) => {
          return `<span class='cursor-pointer detail text-green-700 hover:underline' id='detail-${row.id}'>${row.title}</span>`;
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
          if (currentUser.id == row.authorId) {
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
};

displayHomePage();

export default displayHomePage;
