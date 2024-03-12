const formCreate = document.querySelector("#form-create");
const formEdit = document.querySelector("#form-edit");
const listGroupTodo = document.querySelector("#list-group-todo");
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");
const closeEL = document.querySelector("#close");
// const messageCreate = document.querySelector("#message-create");
const time = document.querySelector("#time");

let editItemId;

const fullDay = document.querySelector("#full-day");
const hourEL = document.querySelector("#hour");
const minuteEL = document.querySelector("#minute");
const secondEL = document.querySelector("#second");

let todos = JSON.parse(localStorage.getItem("list")) ?
    JSON.parse(localStorage.getItem("list"))
    : [];

if (todos.length) showTodos()

function getTime() {
    const now = new Date();
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth();
    const year = now.getFullYear();
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()


    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const month_title = now.getMonth()
    fullDay.textContent = `${date} ${months[month_title]}, ${year}`

    hourEL.textContent = hour
    minuteEL.textContent = minute
    secondEL.textContent = second

    return `${hour}:${minute} ,${date}.${month}.${year}`
}

setInterval(getTime, 1000)

getTime()
function showTodos() {
    const todos = JSON.parse(localStorage.getItem("list"));
    listGroupTodo.innerHTML = ""
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
            <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${item.completed == true ? 'completed' : ''}">
            ${item.text}
            <div class="todo-icons">
              <span class="opacity-50 me-2">${item.time}</span>
              <img onclick="(editTodo(${i}))" src="./edit.svg" alt="edit-icons" width="25" height="25" />
              <img onclick=(deleteTodo(${i})) src="./delete.svg" alt="delte-icons" width="25" height="25" />
            </div>
          </li>
            `
    });
}

function setTodos() {
    localStorage.setItem("list", JSON.stringify(todos));
}

function showMessage(where, message) {
    document.getElementById(`${where}`).innerHTML = message

    setTimeout(() => {
        document.getElementById(`${where}`).innerHTML = "";
    }, 2500)
}

formCreate.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = formCreate['input-create'].value.trim();
    formCreate.reset();
    if (todoText.length) {
        todos.push(editItemId, 1,
            {
                text: todoText, time: getTime(), completed: false
            });
        setTodos();
        showTodos();
    } else {
        showMessage("message-create", "Please enter some text...");
    }
});

formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = formEdit['input-edit'].value.trim();
    formEdit.reset();
    if (todoText.length) {
        todos.splice(editItemId, 1,
            {
                text: todoText, time: getTime(), completed: false
            });
        setTodos();
        showTodos();
        close();
    } else {
        showMessage("message-edit", "Please enter some text...");
    }
});

function deleteTodo(id) {
    const deleteTodo = todos.filter((item, i) => {
        return i !== id;
    });
    todos = deleteTodo
    setTodos();
    showTodos()
}

function setCompleted(id) {
    const completedTodo = todos.map((item, i) => {
        if (id === i) {
            return { ...item, completed: item.completed == true ? false : true }
        } else {
            return { ...item }
        }
    });
    todos = completedTodo
    setTodos();
    showTodos();
}

function editTodo(id) {
    open()
    editItemId = id;
}

overlay.addEventListener("click", close);
closeEL.addEventListener("click", close);

document.addEventListener("keydown", (e) => {
    if (e.which == 27){
        close()
    }
});

function open() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
function close() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}