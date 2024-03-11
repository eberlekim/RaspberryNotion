document.addEventListener('DOMContentLoaded', () => {
    // Set the date at the top of the list
    const dateContainer = document.getElementById('date-container');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateContainer.textContent = currentDate.toLocaleDateString('de-DE', options);

    // Fetch the tasks from your endpoint
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
        .then(response => response.json())
        .then(data => {
            const listElement = document.getElementById('todo-list');
            listElement.innerHTML = ''; // Clear previous content

            // Filter or sort your tasks here if necessary
            // For example, to filter today's tasks, you'd do something like this:
            // data.results.filter(task => taskIsToday(task));

            // Assume data.results is an array of task objects
            data.results.forEach(task => {
                // Create an element for each task
                const taskElement = document.createElement('div');
                taskElement.textContent = task.title; // Replace with your actual property
                listElement.appendChild(taskElement);
            });
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
});
