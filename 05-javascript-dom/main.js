const form = document.querySelector("form");
const title = document.querySelector("#myInput");
const todoStatus = document.querySelector("#status");
const todoId = document.querySelector("#todoId");
const myTable = document.querySelector("#myTable");
const action = document.querySelector("#action");
const btnAdd = document.querySelector("#add");

const allTodos = localStorage.getItem("todos");

const todos = JSON.parse(allTodos) || [];

myTable.innerHTML = `
      <thead>
        <tr>
            <th class="w-10 text-left">No</th>
            <th class="w-60 text-left">Title</th>
            <th class="w-40 text-left">Status</th>
            <th class="w-32 text-left">Action</th>
        </tr>
      </thead>
    `;

title.focus();

const createElement = (elemenet) => {
  return document.createElement(elemenet);
};

const getColumnText = (array, objectKey) => {
  if (objectKey === "no") {
    return array[objectKey] + 1;
  }

  if (objectKey === "status") {
    return array[objectKey] ? "Done" : "Not Started";
  }

  return array[objectKey];
};

const createActionButton = (id) => {
  const col = createElement("td");
  col.classList = "text-xs";

  col.innerHTML = `
  <button id="${id}" class="edit bg-yellow-300 px-2 py-1 hover:opacity-70">
  EDIT
  </button>
  <button id="${id}" class="delete bg-red-300 px-2 py-1 hover:opacity-70">
  HAPUS
  </button>
  `;
  return col;
};

const tBody = createElement("tbody");
todos.map((row, i) => {
  const rowEl = createElement("tr");

  Object.keys(row).map((r) => {
    const colEl = createElement("td");
    const textEl = getColumnText(row, r);

    const text = document.createTextNode(`${textEl}`);
    colEl.appendChild(text);
    colEl.classList.add(`${r}`);
    rowEl.appendChild(colEl);
  });

  const actionButton = createActionButton(row.no);
  rowEl.appendChild(actionButton);
  tBody.appendChild(rowEl);
  myTable.appendChild(tBody);

  const textStatus = document.querySelectorAll(".status");

  Array.from(textStatus).map((sts) => {
    sts.classList.add(
      sts.innerHTML.toLocaleLowerCase() === "done"
        ? "text-green-600"
        : "text-red-600"
    );
  });
});

form.addEventListener("submit", (e) => {
  // e.preventDefault()
  let todo = {};
  if (Array.from(e.target.classList).includes("edit")) {
    todo = {
      no: Number(todoId.value),
      title: title.value,
      status: todoStatus.checked,
    };
    todos[todo.no] = todo;
  } else {
    todo = {
      no: todos[todos?.length - 1]?.no + 1 || 0,
      title: title.value,
      status: todoStatus.checked,
    };

    todos.push(todo);
  }

  localStorage.setItem("todos", JSON.stringify(todos));
  title.value = "";
  todoStatus.checked = false;
});
const deleteButtons = document.querySelectorAll(".delete");

Array.from(deleteButtons).map((btn) => {
  btn.addEventListener("click", (e) => {
    const newTodos = todos.filter((todo) => todo.no != e.target.id);

    localStorage.setItem("todos", JSON.stringify(newTodos));
    location.reload();
  });
});

const editButtons = document.querySelectorAll(".edit");

Array.from(editButtons).map((btn) => {
  btn.addEventListener("click", (e) => {
    const todo = todos.find((todo) => todo.no == e.target.id);
    title.value = todo.title;
    todoStatus.checked = todo.status;
    todoId.value = todo.no;
    add.innerHTML = "SAVE";
    form.classList.add("edit");
  });
});
