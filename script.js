document.addEventListener('DOMContentLoaded', () => {
    // DOM elements for date and day
    const fullDateContainer = document.getElementById('full-date');
    const dayNameContainer = document.getElementById('day-name');

    // Get current date
    const currentDate = new Date();
    const dayNameOptions = { weekday: 'long' };
    const fullDateOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };

    // Display the day name in a large font
    dayNameContainer.textContent = currentDate.toLocaleDateString('de-DE', dayNameOptions);

    // Display the full date in a smaller font
    fullDateContainer.textContent = currentDate.toLocaleDateString('de-DE', fullDateOptions);

    // Function to create and display tasks
    function displayTodos(tasks) {
        const listElement = document.getElementById('todo-list');
        listElement.innerHTML = ''; // Clear the list

        // Loop through the tasks and create elements for each
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            // Here, we assume 'task.title' is the correct property. Adjust as needed.
            taskElement.textContent = `-> ${task.title || 'Untitled'}`;
            listElement.appendChild(taskElement);
        });
    }

    // Mock data for tasks. Replace with your actual fetch logic.
    const mockTasks = [
        { title: 'Wäsche machen' },
        { title: 'Menara digitalisieren' },
        { title: 'Alvena Besprechung 20:00 Uhr und Chillen' },
        { title: 'Treffen mit Mama' }
    ];
    // Call the function to display tasks
    displayTodos(mockTasks);
});
