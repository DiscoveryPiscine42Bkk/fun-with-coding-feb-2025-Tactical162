document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("ft_list");
    const newTodoBtn = document.getElementById("newTodoBtn");

    loadTodos();

    newTodoBtn.addEventListener("click", function () {
        const newTodo = prompt("Enter your new TO DO:");
        if (newTodo && newTodo.trim() !== "") {
            addTodoToDOM(newTodo);
            saveTodos();
        }
    });

    function addTodoToDOM(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.textContent = todo;
        todoDiv.addEventListener("click", function () {
            const confirmRemove = confirm("Are you sure you want to remove this TO DO?");
            if (confirmRemove) {
                todoDiv.remove();
                saveTodos();
            }
        });
        todoList.insertBefore(todoDiv, todoList.firstChild);
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll(".todo").forEach(todoDiv => {
            todos.push(encodeURIComponent(todoDiv.textContent)); // Encode special characters
        });
        document.cookie = "todos=" + JSON.stringify(todos) + ";path=/;expires=" + getCookieExpiration();
        console.log("Cookies after saving:", document.cookie);
    }

    function loadTodos() {
        const cookies = document.cookie.split("; ");
        let todos = [];
        cookies.forEach(cookie => {
            if (cookie.startsWith("todos=")) {
                try {
                    todos = JSON.parse(cookie.substring("todos=".length)).map(todo => decodeURIComponent(todo));
                } catch (error) {
                    console.error("Error parsing todos from cookies:", error);
                    todos = [];
                }
            }
        });

        if (todos.length > 0) {
            todos.forEach(addTodoToDOM);
        } else {
            console.log("No TO DOs found in cookies.");
        }

        console.log("Cookies after loading:", document.cookie);
    }

    function getCookieExpiration() {
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        return date.toUTCString();
    }
});
