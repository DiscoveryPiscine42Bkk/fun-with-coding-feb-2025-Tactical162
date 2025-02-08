$(document).ready(function () {
    function loadTodos() {
        let cookies = document.cookie.split("; ");
        let todos = [];

        cookies.forEach(cookie => {
            if (cookie.startsWith("todos=")) {
                try {
                    todos = JSON.parse(cookie.substring(6)).map(decodeURIComponent);
                } catch (error) {
                    console.error("Error parsing todos:", error);
                }
            }
        });

        todos.forEach(todo => addTodoToDOM(todo, true));
    }

    function addTodoToDOM(todo, isLoading = false) {
        let $todoDiv = $("<div>").addClass("todo").text(todo);

        $todoDiv.on("click", function () {
            if (confirm("Are you sure you want to remove this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

        isLoading ? $("#ft_list").append($todoDiv) : $("#ft_list").prepend($todoDiv);
    }

    function saveTodos() {
        let todos = $(".todo").map((_, el) => encodeURIComponent($(el).text())).get();
        document.cookie = "todos=" + JSON.stringify(todos) + ";path=/;expires=" + getCookieExpiration();
    }

    function getCookieExpiration() {
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        return date.toUTCString();
    }

    $("#newTodoBtn").on("click", function () {
        let newTodo = prompt("Enter your new TO DO:");
        if (newTodo && newTodo.trim() !== "") {
            addTodoToDOM(newTodo);
            saveTodos();
        }
    });

    loadTodos();
});
