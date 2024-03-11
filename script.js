document.addEventListener('DOMContentLoaded', () => {
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        const listElement = document.getElementById('todo-list');
        if (!listElement) {
            console.error('Element with ID "todo-list" not found.');
            return;
        }

        listElement.innerHTML = ''; // Clear previous content

        if (data.object === 'list' && data.results.length > 0) {
            data.results.forEach(item => {
                // Accessing the title through the Job property
                const titleText = item?.properties?.Job?.title?.[0]?.plain_text || 'Untitled';
                const listItem = document.createElement('div');
                listItem.classList.add('todo');
                listItem.textContent = `-> ${titleText}`;
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

    // Refresh the page every 30 seconds
    setTimeout(function(){
        window.location.reload(1);
    }, 30000); // 30000 milliseconds = 30 seconds
});
