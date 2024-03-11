document.addEventListener('DOMContentLoaded', () => {
    // Define a function to update the date and day
    function updateDateAndDay() {
        const currentDate = new Date();
        const fullDateContainer = document.getElementById('full-date');
        const dayNameContainer = document.getElementById('day-name');
        const dateStringOptions = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
        const dayStringOptions = { weekday: 'long', timeZone: 'UTC' };

        fullDateContainer.textContent = currentDate.toLocaleDateString('de-DE', dateStringOptions);
        dayNameContainer.textContent = currentDate.toLocaleDateString('de-DE', dayStringOptions);
    }

    // Call the function to update the date and day
    updateDateAndDay();

    // Fetch todos and display today's tasks
    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        const listElement = document.getElementById('todo-list');
        if (!listElement) {
            console.error('Element with ID "todo-list" not found.');
            return;
        }

        listElement.innerHTML = ''; // Clear previous content
        const today = new Date().toISOString().split('T')[0];

        data.results.forEach(item => {
            // Assuming the date is stored in a property named 'Datum'
            const itemDate = item.properties.Datum.date.start;
            if (itemDate === today) {
                const titleText = item.properties.Job.title[0].plain_text || 'Untitled';
                const listItem = document.createElement('div');
                listItem.classList.add('todo');
                listItem.textContent = `-> ${titleText}`;
                listElement.appendChild(listItem);
            }
        });

        if (listElement.innerHTML === '') {
            listElement.textContent = 'No todos found for today.';
        }
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
        listElement.textContent = 'Failed to load todos.';
    });

    // Refresh the page every 30 seconds
    setTimeout(function(){
        window.location.reload(1);
    }, 30000);
});
