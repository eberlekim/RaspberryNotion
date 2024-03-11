document.addEventListener('DOMContentLoaded', () => {
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const list = document.getElementById('todo-list'); // Ensure this ID exists in your HTML
        if (list) { // Verify element exists before attempting to modify it
            list.innerHTML = ''; // Clear "Loading todos..."
            if (data && data.results && data.results.length > 0) {
                data.results.forEach(todo => {
                    // Assuming the structure of your todo items here, adjust as necessary
                    const title = todo.properties.Name.title[0]?.plain_text || 'No Title';
                    const item = document.createElement('div');
                    item.textContent = title;
                    list.appendChild(item);
                });
            } else {
                list.textContent = 'No todos found.';
            }
        }
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
        const list = document.getElementById('todo-list');
        if (list) { // Again, check if the element exists
            list.textContent = 'Failed to load todos.';
        }
    });
});
