document.addEventListener('DOMContentLoaded', () => {
    const fullDateContainer = document.getElementById('full-date');
    const dayNameContainer = document.getElementById('day-name');
    const currentDate = new Date();
    const dayNameOptions = { weekday: 'long' };
    const fullDateOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };

    // Display the full date and the day name
    fullDateContainer.textContent = currentDate.toLocaleDateString('de-DE', fullDateOptions);
    dayNameContainer.textContent = currentDate.toLocaleDateString('de-DE', dayNameOptions);

    // Fetch the tasks from your Notion endpoint
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
        .then(response => response.json())
        .then(data => {
            const listElement = document.getElementById('todo-list');
            listElement.innerHTML = ''; // Clear previous todos

            // Extract and display todos, modifying this based on your Notion data structure
            data.results.forEach(page => {
                // Replace with your actual path to the title in your Notion tasks
                const todoText = page.properties.Name.title[0].text.content; 
                const todoItem = document.createElement('div');
                todoItem.classList.add('todo'); // Add the class for styling
                todoItem.innerHTML = `-&gt; ${todoText}`;
                listElement.appendChild(todoItem);
            });
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
});
