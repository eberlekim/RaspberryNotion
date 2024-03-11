document.addEventListener('DOMContentLoaded', () => {
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        const listElement = document.getElementById('todo-list');
        if (!listElement) {
            console.error('Element with ID "todo-list" not found.');
            return;
        }

        // Clear the placeholder text
        listElement.innerHTML = '';

        // Check for and iterate through the results
        if (data.object === 'list' && data.results.length > 0) {
            data.results.forEach(item => {
                // Log each item's Job property for inspection
                console.log('Job property:', item.properties.Job);

                // Safely access the title text
                const titleText = item.properties.Job?.title[0]?.plain_text || 'Untitled';
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
        listElement.textContent = 'Failed to load todos.';
    });
});
