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

    function addTodoToDOM(todo, isLoading = false) {
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

        if (isLoading) {
            todoList.appendChild(todoDiv); // โหลดจากคุกกี้ให้เรียงตามที่บันทึกไว้
        } else {
            todoList.insertBefore(todoDiv, todoList.firstChild); // ให้รายการใหม่อยู่บนสุด
        }
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
            todos.forEach(todo => addTodoToDOM(todo, true)); // ใช้ isLoading = true เพื่อให้ appendChild()
        } else {
            console.log("No TO DOs found in cookies.");
        }
    }

    function getCookieExpiration() {
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        return date.toUTCString();
    }
});
