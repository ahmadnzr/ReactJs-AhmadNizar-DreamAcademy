import { getUser, getUsers } from "./functions.js";

const userList = `
    <div class="w-full md:container mx-auto h-full flex items-center justify-between">
        <div class="flex gap-2">
          <h1 class="hover:underline"><a href="/">Home</a></h1>
          <h1 class="hover:underline"><a href="/user.html">User</a></h1>
        </div>
        <select
          class="w-40 cursor-pointer outline-none px-2 py-1"
          name="users-list"
          id="user-list"></select>
    </div>
`;

const navbar = $(
  '<nav class="h-14 bg-gray-100 sticky top-0 left-0 right-0"></nav>'
);
navbar.append(userList);

$("body").prepend(navbar);

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const getUserList = async () => {
  const userList = await getUsers();
  userList.map((user) => {
    const selected = user.id == currentUser?.id ? "selected" : null;
    const option = `<option value='${user.id}' ${selected}>${user.username}</option>`;
    $("#user-list").append(option);
  });
};

getUserList();

$("#user-list").change(async (e) => {
  const user = await getUser(e.target.value);
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.reload();
});
