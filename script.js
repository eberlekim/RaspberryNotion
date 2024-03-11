document.addEventListener('DOMContentLoaded', () => {
    const fullDateContainer = document.getElementById('full-date');
    const dayNameContainer = document.getElementById('day-name');
    const todoListContainer = document.getElementById('todo-list');
    const currentDate = new Date();
    const dateStringOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dayStringOptions = { weekday: 'long' };

    fullDateContainer.textContent = currentDate.toLocaleDateString('de-DE', dateStringOptions);
    dayNameContainer.textContent = currentDate.toLocaleDateString('de-DE', dayStringOptions);

    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
        .then(response => response.json())
        .then(data => {
            todoListContainer.innerHTML = '';

            const today = currentDate.toISOString().split('T')[0];
            const todayTasks = data.results.filter(item => {
                const date = item.properties.Datum?.date?.start;
                return date === today;
            });

            todayTasks.forEach(item => {
                const titleText = item.properties.Job?.title[0]?.plain_text || 'Untitled';
                const listItem = document.createElement('div');
                listItem.classList.add('todo');
                listItem.textContent = `-> ${titleText}`;
                todoListContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
            todoListContainer.textContent = 'Failed to load todos.';
        });
});
