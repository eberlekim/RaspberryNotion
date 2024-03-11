document.addEventListener('DOMContentLoaded', () => {
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        console.log("Received data:", data); // Log the entire received data for inspection
        const listElement = document.getElementById('todo-list');
        if (!listElement) {
            console.error('Element with ID "todo-list" not found.');
            return;
        }

        listElement.innerHTML = ''; // Clear previous content

        if (data.object === 'list' && data.results.length > 0) {
            data.results.forEach(item => {
                // Adjusted to use optional chaining and a more careful approach
                const titleText = item?.properties?.Name?.title?.[0]?.plain_text || 'Untitled';
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
