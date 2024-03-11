document.addEventListener('DOMContentLoaded', () => {
    const fetchTodos = () => {
        fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
        .then(response => response.json())
        .then(updateTodoList)
        .catch(error => {
            console.error('Error fetching todos:', error);
            const listElement = document.getElementById('todo-list');
            listElement.textContent = 'Failed to load todos.';
        });
    };

    // Call fetchTodos immediately to load tasks, and then every 30 seconds
    fetchTodos();
    setInterval(fetchTodos, 30000); // 30000 milliseconds = 30 seconds
});

// Refactor the data handling and DOM updating code into this function
function updateTodoList(data) {
    const listElement = document.getElementById('todo-list');
    if (!listElement) {
        console.error('Element with ID "todo-list" not found.');
        return;
    }
    
    // The rest of the code for updating the todo list goes here...
}
