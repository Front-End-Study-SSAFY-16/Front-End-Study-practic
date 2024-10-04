const inputBox = document.querySelector('#inputBox');
const todoForm = document.querySelector('.todoForm');
const ul = document.querySelector('.list');

const LS_KEY = 'todo';

function openInputBox(e) {
  console.log(e.target);
  const middle = document.querySelector('.middle');

  middle.classList.add('open');

  e.target.focus();
  inputBox.removeEventListener('click', openInputBox);
}

function updateTodo(e) {
  console.log(e.target);
  const updateBtn = e.target;
  const li = updateBtn.closest('li');
  const btnBox = updateBtn.parentNode;
  const completeBtn = btnBox.querySelector('.completeBtn');
  const todo = li.querySelector('.todo_input');

  todo.disabled = false;

  updateBtn.classList.add('disable');
  completeBtn.classList.remove('disable');
  completeBtn.classList.add('active');
}

function deleteTodo(e) {
  console.log(e.target);
  const li = e.target.closest('li');
  li.remove();
}

function completeTodo(e) {
  console.log(e.target);
  const completeBtn = e.target;
  const li = completeBtn.closest('li');
  const todoInput = li.querySelector('.todo_input');
  const updateBtn = li.querySelector('.updateBtn');

  todoInput.disabled = true;
  completeBtn.classList.add('disable');
  completeBtn.classList.remove('active');
  updateBtn.classList.remove('disable');
}

const setForm = (e) => {
  e.preventDefault();

  const input = document.querySelector('#todoInput');

  const value = input.value;
  const ulSize = ul.children.length;

  // 1. todo 생성
  insertTodo(ulSize + 1, value);

  // 2. input 초기화
  input.value = '';
};

function insertTodo(id, value) {
  ul.innerHTML += `
      <li id="${id}" class="todo">
            <div class="data-box">
              <span class="date">2024-10-01</span>
              <input class="todo_input" type="text" value="${value}" disabled />
            </div>
            <div class="menu">
              <div class="btn-box">
                <button class="updateBtn">수정</button>
                <button class="completeBtn disable">완료</button>
                <button class="deleteBtn">삭제</button>
              </div>
            </div>
          </li>
  `;

  const updateBtn = document.querySelector('.updateBtn');
  const completeBtn = document.querySelector('.completeBtn');
  const deleteBtn = document.querySelector('.deleteBtn');
}

const handleListClick = (e) => {
  if (e.target.classList.contains('updateBtn')) {
    updateTodo(e);
  } else if (e.target.classList.contains('completeBtn')) {
    completeTodo(e);
  } else if (e.target.classList.contains('deleteBtn')) {
    deleteTodo(e);
  }
};

function removeLocalStorage(id) {
  localStorage.removeItem();
}

function saveLocalStorage() {}

function loadLocalStorage() {
  localStorage.getItem();
}

function init() {
  inputBox.addEventListener('click', openInputBox);

  // insert Todo
  todoForm.addEventListener('submit', setForm);

  // 이벤트 위임
  ul.addEventListener('click', handleListClick);
}

init();
