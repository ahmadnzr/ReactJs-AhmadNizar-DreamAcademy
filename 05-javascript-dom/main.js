const form = document.querySelector("form");
const title = document.querySelector("#myInput");
const todoStatus = document.querySelector("#status");
const todoId = document.querySelector("#todoId");
const myTable = document.querySelector("#myTable");
const action = document.querySelector("#action");
const btnAdd = document.querySelector("#add");

const allTodos = localStorage.getItem("todos");

const todos = JSON.parse(allTodos) || [];

title.focus();

const createElement = (elemenet) => {
  return document.createElement(elemenet);
};

const getColumnText = (array, objectKey, index) => {
  if (objectKey === "no") {
    return index + 1;
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
    const textEl = getColumnText(row, r, i);

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
  if (todoId.value) {
    todo = {
      no: todoId.value,
      title: title.value,
      status: todoStatus.checked,
    };
    const indexEdit = todos.findIndex(todo => todo.no == todoId.value)
    todos[indexEdit] = todo;
  } else {
    todo = {
      no: new Date().getTime(),
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
  });
});
