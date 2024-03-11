document.addEventListener('DOMContentLoaded', () => {
    function updateDateAndDay() {
        const currentDate = new Date();
        // Generate the local date string according to Swiss standards
        const localDateString = currentDate.toLocaleDateString('de-CH');
        const fullDateContainer = document.getElementById('full-date');
        const dayNameContainer = document.getElementById('day-name');
        // Adjust options for Swiss locale
        const dateStringOptions = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Zurich' };
        const dayStringOptions = { weekday: 'long', timeZone: 'Europe/Zurich' };

        fullDateContainer.textContent = currentDate.toLocaleDateString('de-CH', dateStringOptions);
        dayNameContainer.textContent = currentDate.toLocaleDateString('de-CH', dayStringOptions);
    }

    updateDateAndDay();

    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        const listElement = document.getElementById('todo-list');
        if (!listElement) {
            console.error('Element with ID "todo-list" not found.');
            return;
        }

        listElement.innerHTML = ''; // Clear previous content
        // Use Swiss locale to get today's date in local time zone
        const today = new Date().toLocaleDateString('de-CH');

        data.results.forEach(item => {
            // Assuming the date is in a property named 'Datum'
            // and converting to Swiss locale date string for comparison
            const itemDate = new Date(item.properties.Datum.date.start).toLocaleDateString('de-CH');
            if (itemDate === today) {
                const titleText = item.properties.Job.title[0]?.plain_text || 'Untitled';
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
        const listElement = document.getElementById('todo-list');
        if(listElement) listElement.textContent = 'Failed to load todos.';
    });

    // Refresh the page every 30 seconds
    setTimeout(function(){
        window.location.reload(1);
    }, 30000);
});
