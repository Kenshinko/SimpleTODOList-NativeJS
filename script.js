'use strict';

const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#todo-input');
let taskCount = 3;


todoList.addEventListener('click', completeTask);
todoForm.addEventListener('submit', addTask);

function addTask (event) {
  event.preventDefault();
  
  const taskText = todoInput.value;
  taskCount++;
  todoList.insertAdjacentHTML('beforeend',
  `<li class="list-group-item apply-task">
    <input class="form-check-input me-2" type="checkbox">
    <label class="form-check-label" for="task${taskCount}">${taskText}</label>
   </li>`);

  todoInput.value = '';
  todoInput.focus();
}

function completeTask (event) {
  if (event.target.getAttribute('type') === 'checkbox') {
    event.target.setAttribute('disabled', true);
    addDeleteBtn(event.target);
  }
}

function addDeleteBtn (target) {
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'btn btn-outline-primary btn-delete');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.innerHTML = `<i class="bi bi-recycle"></i>&nbsp;Удалить`;

  target.parentNode.append(deleteBtn);
  deleteBtn.addEventListener('click', deleteTask);
}

async function deleteTask () {
  await countdownDelete(this, 5000);

  this.parentNode.setAttribute('class', 'list-group-item drop-task');
  setTimeout(() => {
    this.parentNode.remove();
  }, 600);
  taskCount--;
}

function countdownDelete (thisBtn, timeout) {
  return new Promise((resolve) => {
    thisBtn.setAttribute('disabled', true);
    
    let countDelete = 5;
    let interval = setInterval(() => {
      countDelete--;
      thisBtn.innerHTML = `<i class="bi bi-recycle"></i>&nbsp;00:0${countDelete}`;
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      resolve();
    }, timeout);
  });
}
