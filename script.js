document.addEventListener('DOMContentLoaded', () => {
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        const listElement = document.getElementById('todo-list');
        if (!listElement) {
            console.error('Element with ID todo-list not found.');
            return;
        }
        
        // Clear loading message
        listElement.innerHTML = '';

        // Check if there are any results
        if (data.object === 'list' && data.results.length > 0) {
            data.results.forEach((item) => {
                // Assuming each item has a property 'Name' with a title structure
                const title = item.properties.Name.title[0]?.plain_text || 'Untitled';
                const listItem = document.createElement('div');
                listItem.textContent = title;
                listElement.appendChild(listItem);
            });
        } else {
            listElement.textContent = 'No todos found.';
        }
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
        document.getElementById('todo-list').textContent = 'Failed to load todos.';
    });
});
