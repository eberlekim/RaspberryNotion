document.addEventListener('DOMContentLoaded', () => {
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        const listElement = document.getElementById('todo-list');
        if (!listElement) {
            console.error('Element with ID "todo-list" not found.');
            return;
        }

        // Clear previous content
        listElement.innerHTML = '';

        if (data.object === 'list' && data.results.length > 0) {
            console.log("First item for inspection:", data.results[0]); // Temporarily log the structure

            data.results.forEach(item => {
                // More robust checking
                let titleText = 'Untitled'; // Default title
                if (item.object === 'page' && item.properties && item.properties.Name && Array.isArray(item.properties.Name.title) && item.properties.Name.title.length > 0) {
                    titleText = item.properties.Name.title[0].plain_text || 'Untitled';
                }

                const listItem = document.createElement('div');
                listItem.textContent = titleText;
                listElement.appendChild(listItem);
            });
        } else {
            listElement.textContent = 'No todos found.';
        }
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
        if(listElement) { // Ensure listElement is defined
            listElement.textContent = 'Failed to load todos.';
        }
    });
});
