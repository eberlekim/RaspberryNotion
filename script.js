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

        const today = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format

        const todaysTasks = data.results.filter(item => {
            const itemDate = item.properties.Datum?.date?.start; // Adjust if your date structure is different
            return itemDate === today;
        });

        if (todaysTasks.length > 0) {
            todaysTasks.forEach(item => {
                const titleText = item?.properties?.Job?.title?.[0]?.plain_text || 'Untitled';
                const listItem = document.createElement('div');
                listItem.textContent = titleText;
                listElement.appendChild(listItem);
            });
        } else {
            listElement.textContent = 'No tasks for today.';
        }
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
        listElement.textContent = 'Failed to load todos.';
    });
});
