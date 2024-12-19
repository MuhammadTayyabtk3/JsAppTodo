import { database, ref, push, remove, update, onValue } from './firebase.js';

var userInput = document.getElementById("user-inp");
var listContainer = document.getElementById("todo-list");
var tododata = [];

// Fetch TODOs from Firebase and Render
function fetchTodos() {
    onValue(ref(database, "todos"), (snapshot) => {
        tododata = [];
        listContainer.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            var key = childSnapshot.key;
            var todoItem = childSnapshot.val().task;
            tododata.push({ key, task: todoItem });
        });
        randertodo();
    });
}

// Render TODOs to UI
function randertodo() {
    listContainer.innerHTML = "";
    for (var i = 0; i < tododata.length; i++) {
        listContainer.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${tododata[i].task}
            <div>
                <button class="btn btn-warning btn-sm me-2" onclick="edittodo(${i})">EDIT</button>
                <button class="btn btn-danger btn-sm" onclick="deltodo(${i})">DEL</button>
            </div>
        </li>`;
    }
}

// Add TODO to Firebase
window.addtodolist = function () {
    var todoText = userInput.value.trim();
    if (todoText) {
        push(ref(database, "todos"), { task: todoText });
        userInput.value = ""; // Clear input
    } else {
        alert("Please enter a TODO item!");
    }
};

// Edit TODO
window.edittodo = function (index) {
    var todoItem = document.querySelectorAll("li")[index];
    var originalTodo = tododata[index].task;
    todoItem.innerHTML = `
        <div class="input-group">
            <input class="form-control" type="text" id="editInput${index}" value="${originalTodo}" />
            <button class="btn btn-primary" onclick="saveTodo(${index})">SAVE</button>
        </div>`;
};

// Save Updated TODO in Firebase
window.saveTodo = function (index) {
    var updatedValue = document.getElementById(`editInput${index}`).value.trim();
    if (updatedValue) {
        var todoKey = tododata[index].key;
        update(ref(database, `todos/${todoKey}`), { task: updatedValue });
    } else {
        alert("Todo item cannot be empty!");
    }
};

// Devare Single TODO from Firebase
window.deltodo = function (index) {
    var todoKey = tododata[index].key;
    remove(ref(database, `todos/${todoKey}`));
};

// Devare All TODOs
window.delalltodo = function () {
    remove(ref(database, "todos"));
};

// Fetch TODOs on Page Load
fetchTodos();
