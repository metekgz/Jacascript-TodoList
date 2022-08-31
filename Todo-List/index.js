// selectors

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const todoList = document.querySelector(".todo-list");
const selectTodo = document.querySelector(".select-todo");

// alerts

const alertSuccess = document.querySelector(".alert-success");
const alertWarning = document.querySelector(".alert-warning");

// event

// listeye eleman ekleme
searchButton.addEventListener("click", addTodo);

// listedeki elemanları silme
todoList.addEventListener("click", deleteElement);

// eklenen listede tamamlanan ve tamamlanmayan elemanların gösterimi
selectTodo.addEventListener("click", todoSelect);

// LocalStorage getTodos
document.addEventListener("DOMContentLoaded", function () {
  getTodos();
});

function addTodo(event) {
  event.preventDefault();

  const isEmpty = (emp) => !emp.trim().length;

  if (isEmpty(searchInput.value)) {
    alertWarning.style.display = "block";

    setTimeout(() => {
      alertWarning.style.display = "none";
    }, 2000);

    // todo eklendikten sonra inputun temizlenmesi
    searchInput.value = "";
  } else {
    alertSuccess.style.display = "block";

    setTimeout(() => {
      alertSuccess.style.display = "none";
    }, 2000);

    saveTodos(searchInput.value);

    // div oluşturma
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // add butonu oluşturma
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("add-btn");
    todoDiv.appendChild(completedButton);

    // li oluşturma

    const newTodo = document.createElement("li");
    newTodo.innerText = searchInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // delete butonu oluşturma

    const uncompletedButton = document.createElement("button");
    uncompletedButton.innerHTML = "<i class='fa fa-minus'></i>";
    uncompletedButton.classList.add("delete-btn");
    todoDiv.appendChild(uncompletedButton);

    // listeye ekleme kısmı

    todoList.appendChild(todoDiv);

    // todo eklendikten sonra inputun temizlenmesi
    searchInput.value = "";
  }
}

function deleteElement(event) {
  const item = event.target;

  // todo elemanı ekleme işlemi

  if (item.classList[0] === "add-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  // todo elemanı silme işlemi

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    // kayıtlı elemanı localeStorageden silme
    removeLocalStorage(todo);
    todo.remove();
  }
}

function todoSelect(event) {
  const todos = todoList.childNodes;

  todos.forEach(function (item) {
    switch (event.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

// local storage

// locale kaydetme
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    // div oluşturma
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // add butonu oluşturma
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("add-btn");
    todoDiv.appendChild(completedButton);

    // li oluşturma

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // delete butonu oluşturma

    const uncompletedButton = document.createElement("button");
    uncompletedButton.innerHTML = "<i class='fa fa-minus'></i>";
    uncompletedButton.classList.add("delete-btn");
    todoDiv.appendChild(uncompletedButton);

    // listeye ekleme kısmı

    todoList.appendChild(todoDiv);
  });
}

function saveTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
