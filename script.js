document.addEventListener('DOMContentLoaded', () => {
    function updateDateAndDay() {
        const currentDate = new Date();
        const localDateString = currentDate.toLocaleDateString('de-CH', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const fullDateContainer = document.getElementById('full-date');
        const dayNameContainer = document.getElementById('day-name');

        fullDateContainer.textContent = localDateString;
        dayNameContainer.textContent = currentDate.toLocaleDateString('de-CH', { weekday: 'long' });
    }

    function fetchTodos() {
        fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
        .then(response => response.json())
        .then(data => {
            const listElement = document.getElementById('todo-list');
            listElement.innerHTML = ''; // Clear previous content
            const today = new Date().toLocaleDateString('de-CH', { year: 'numeric', month: '2-digit', day: '2-digit' });

            data.results.forEach(item => {
                const itemDateStart = item.properties.Datum?.date?.start;
                if (!itemDateStart) return; // Skip if no start date

                const itemDate = new Date(itemDateStart).toLocaleDateString('de-CH', { year: 'numeric', month: '2-digit', day: '2-digit' });
                if (itemDate === today) {
                    const titleText = item.properties.Job?.title[0]?.plain_text || 'Untitled';
                    const color = item.properties.Color?.select?.name; // Assuming 'Color' is the property name in Notion
                    const listItem = document.createElement('div');
                    listItem.classList.add('todo');
                    listItem.setAttribute('data-color', color); // Dynamically set color
                    listItem.textContent = `${titleText}`;
                    listElement.appendChild(listItem);
                }
            });

            if (listElement.innerHTML === '') {
                listElement.textContent = 'No todos found for today.';
            }
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
            document.getElementById('todo-list').textContent = 'Failed to load todos.';
        });
    }

    updateDateAndDay();
    fetchTodos();

    // Refresh the fetched todos every 30 seconds without reloading the page
    setInterval(fetchTodos, 30000);
});
