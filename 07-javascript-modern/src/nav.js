import { getUser, getUsers, getCurrentUser } from "./functions.js";
import displayHomePage from "./main.js";

const userList = `
    <div class="w-full md:container mx-auto h-full flex items-center justify-between">
        <h1 class="cursor-pointer font-bold text-xl hover:underline" id="nav-title">Home</h1>
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

await getUserList();

$("#user-list").change(async (e) => {
  const user = await getUser(e.target.value);
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.reload();
});

$("#nav-title").click(async (e) => {
  await displayHomePage();
  history.pushState({ page: "home" }, "", "/");
});
