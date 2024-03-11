document.addEventListener('DOMContentLoaded', () => {
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        const listElement = document.getElementById('todo-list'); // Ensure this ID exists in your HTML
        if (!listElement) {
            console.error('Element with ID todo-list not found.');
            return;
        }
        
        // Clear previous content
        listElement.innerHTML = '';
        
        // Check if there are results
        if (data.object === 'list' && data.results.length > 0) {
            data.results.forEach((item) => {
                // Check if the page object has a title property
                if (item.object === 'page' && item.properties.Name.title.length > 0) {
                    const titleText = item.properties.Name.title[0].plain_text || 'Untitled';
                    const listItem = document.createElement('div');
                    listItem.textContent = titleText;
                    listElement.appendChild(listItem);
                }
            });
        } else {
            listElement.textContent = 'No todos found.';
        }
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
        const listElement = document.getElementById('todo-list');
        if (listElement) {
            listElement.textContent = 'Failed to load todos.';
        }
    });
});
