
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
let todoArr = localStorage.getItem("todos");

// Get data store in localStorage
if (todoArr !== null) {
  todoArr = JSON.parse(localStorage.todos);
  getTodos();

} else
  todoArr = [];

todoButton.addEventListener('click', addTodo);

function addTodo(event) {

  const newTodo = {
    "name": todoInput.value,
    "isCompleted": false
  };

  // If is empty
  if (!todoInput.value.trim())
    return;

  // Prevent the web page to reload
  event.preventDefault();

  // add todo to list
  todoArr.push(newTodo);

  // Store the data/all todos
  localStorage.setItem("todos", JSON.stringify(todoArr));

  //Todo DIV
  const size = todoArr.length == 0 ? 0 : todoArr.length - 1;
  //console.log("Adding to size: " + size);
  const todoDiv = todoFormat(size, todoInput.value);
  todoList.append(todoDiv);

  todoInput.value = "";

  // console.log(todos);
};

function getTodos() {

  for (i in todoArr) {
    const todoDiv = todoFormat(i, todoArr[i].name);
    todoList.append(todoDiv);
  }
  // console.log(todoArr);
}

function todoFormat(todoId, todoText) {
  todoId = "todo" + todoId;
  // console.log(todoId);
  const checkedIcon = createCheckedIcon(todoId);
  const uncheckedIcon = createUncheckedIcon(todoId);

  // Icon Div - to add action to the fa icons
  // const iconCheckedDiv = document.createElement("Span");
  // iconCheckedDiv.classList.add("checkedIcon");
  // iconCheckedDiv.append(checkedBox);

  // const iconUncheckedDiv = document.createElement("Div");
  // iconUncheckedDiv.classList.add("uncheckedIcon");
  // iconUncheckedDiv.append(uncheckedBox);

  // console.log(iconUncheckedDiv);


  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.id = todoId;
  todoDiv.classList.add("todo");

  const index = todoId.replace('todo', '');
  // console.log(todoArr[index]);
  if (todoArr[index])
    if (todoArr[index].isCompleted)
      todoDiv.classList.add("completed");

  // Todo HEADER Div
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("todoHeader");

  // Set icon state
  if (todoDiv.classList[1] === "completed")
    headerDiv.append(checkedIcon);

  else
    headerDiv.append(uncheckedIcon);

  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoText;
  newTodo.classList.add("todo-item");
  headerDiv.append(newTodo);
  todoDiv.append(headerDiv);

  // Buttons Div
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-div");

  // Edit Button
  // const editButton = document.createElement("Button");
  // editButton.innerHTML = '<i class="fas fa-edit"></i>'
  // editButton.classList.add("edit-btn");
  // editButton.setAttribute('onclick', `editTodo(${todoId})`);
  // buttonsDiv.append(editButton);

  // Delete Button
  const deleteButton = document.createElement("Button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
  deleteButton.classList.add("delete-btn");
  deleteButton.setAttribute('onclick', `deleteTodo(${todoId})`);
  buttonsDiv.append(deleteButton);

  todoDiv.append(buttonsDiv);
  return todoDiv;
}

function deleteTodo(todo) {
  const index = todo.id.replace('todo', '');
  console.log("Deleted: " + index);

  // Delete from the array
  todoArr.splice(index, 1);

  // Update localStorage
  let todosJson = JSON.stringify(todoArr);
  localStorage.setItem("todos", todosJson);

  // console.log(todoArr);

  // Delete from HTML
  document.querySelector(`.todo-list`).innerHTML = "";
  getTodos();
}

// function editTodo(index) {
//   console.log("Edited");
// }

function toggleTodo(todoId) {
  if (!todoId) {
    console.log("Erro ao passar TodoId: " + todoId);
    return;
  }


  const checkedIcon = createCheckedIcon(todoId.id);
  const uncheckedIcon = createUncheckedIcon(todoId.id);

  todoId.classList.toggle("completed");
  const todoChild = todoId.firstElementChild;
  //console.log(todoId.classList)
  index = todoId.id.replace('todo', '');

  todoChild.removeChild(todoChild.firstElementChild);
  // console.log(todoChild);
  // console.log(todoChild.firstElementChild);

  const todo = todoArr[index];

  if (todoId.classList[1] === "completed") {
    console.log("check");
    todoChild.prepend(checkedIcon)
    todo.isCompleted = true;
  }

  else {
    console.log("uncheck");
    todoChild.prepend(uncheckedIcon)
    todo.isCompleted = false;
  }

  todoArr[index] = todo;
  console.log(todo)
  localStorage.setItem("todos", JSON.stringify(todoArr));
}

function createUncheckedIcon(todoId) {
  // console.log(todoId)

  const uncheckedBox = document.createElement("i");
  uncheckedBox.classList.add("fas", "fa-square", "uncheckedIcon");
  uncheckedBox.setAttribute("onclick", `toggleTodo(${todoId})`);

  return uncheckedBox;
}

function createCheckedIcon(todoId) {
  const checkedBox = document.createElement("i");
  checkedBox.classList.add("fas", "fa-square-check", "checkedIcon");
  checkedBox.setAttribute("onclick", `toggleTodo(${todoId})`);

  return checkedBox;
}
