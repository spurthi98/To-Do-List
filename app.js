const todoinput = document.querySelector('.todo-input');

const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');

//event listener
todobutton.addEventListener("click", addtodo);
todolist.addEventListener("click", deletecheck);

document.addEventListener("DOMContentLoaded",getToDo);


//function
function addtodo(event) {
  //prevent from reload/submit page
  event.preventDefault();

  //todo div
  const tododiv = document.createElement('div');
  tododiv.classList.add('todo');

  //create li
  const newtodo = document.createElement('li');
  newtodo.innerText = todoinput.value;
  newtodo.classList.add('todo-item');
  tododiv.appendChild(newtodo);

  //add to local storage
  saveLocalToDo(todoinput.value);
  //check button
  const checkbutton = document.createElement('button');
  checkbutton.innerHTML = '<i class="fas fa-check"></i>';
  checkbutton.classList.add('check-btn');
  tododiv.appendChild(checkbutton);
  //delete button
  const deletebutton = document.createElement('button');
  deletebutton.innerHTML = '<i class="fas fa-trash"></i>';
  deletebutton.classList.add('trash-btn');
  tododiv.appendChild(deletebutton);

  //append all of this to the list
  todolist.appendChild(tododiv);

  //clear the input field
  todoinput.value = "";

}


//delete check funciton
function deletecheck(e) {
  const item = e.target;

  //delete
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeToDo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });

  }

  //check
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function saveLocalToDo(todo) {

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // console.log("hi",todo);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getToDo(todo) {

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //todo div
    const tododiv = document.createElement('div');
    tododiv.classList.add('todo');

    //create li
    const newtodo = document.createElement('li');
    newtodo.innerText = todo;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);

    //check button
    const checkbutton = document.createElement('button');
    checkbutton.innerHTML = '<i class="fas fa-check"></i>';
    checkbutton.classList.add('check-btn');
    tododiv.appendChild(checkbutton);
    //delete button
    const deletebutton = document.createElement('button');
    deletebutton.innerHTML = '<i class="fas fa-trash"></i>';
    deletebutton.classList.add('trash-btn');
    tododiv.appendChild(deletebutton);

    //append all of this to the list
    todolist.appendChild(tododiv);
  });
}

function removeToDo(todo){
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoindex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoindex),1); 
  localStorage.setItem("todos", JSON.stringify(todos));
}
