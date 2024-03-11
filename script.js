document.addEventListener('DOMContentLoaded', () => {
    function updateDateAndDay() {
        const currentDate = new Date();
        // Adjusting for locale 'de-CH' for Switzerland
        const localDateString = currentDate.toLocaleDateString('de-CH', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const fullDateContainer = document.getElementById('full-date');
        const dayNameContainer = document.getElementById('day-name');

        fullDateContainer.textContent = localDateString;
        dayNameContainer.textContent = currentDate.toLocaleDateString('de-CH', { weekday: 'long' });
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
        const today = new Date().toLocaleDateString('de-CH', { year: 'numeric', month: '2-digit', day: '2-digit' });

        data.results.forEach(item => {
            // Ensure we are accessing the date property correctly
            const itemDateStart = item.properties.Datum?.date?.start;
            if (!itemDateStart) return; // Skip if no start date

            const itemDate = new Date(itemDateStart).toLocaleDateString('de-CH', { year: 'numeric', month: '2-digit', day: '2-digit' });
            if (itemDate === today) {
                // Ensure title is accessed correctly; adjust 'Job' and 'title' as needed
                const titleText = item.properties.Job?.title[0]?.plain_text || 'Untitled';
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
        if (listElement) listElement.textContent = 'Failed to load todos.';
    });

    // Refresh the page every 30 seconds
    setTimeout(function(){
        window.location.reload(1);
    }, 30000);
});
