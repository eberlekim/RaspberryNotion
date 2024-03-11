document.addEventListener('DOMContentLoaded', () => {
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const list = document.getElementById('todo-list');
        list.innerHTML = ''; // Clear "Loading todos..."
        if (data && data.results) {
            data.results.forEach(todo => {
                const title = todo.properties.Name.title[0]?.plain_text || 'No Title';
                const item = document.createElement('div');
                item.textContent = title;
                list.appendChild(item);
            });
        } else {
            list.textContent = 'No todos found.';
        }
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
        document.getElementById('todo-list').textContent = 'Failed to load todos.';
    });
});
