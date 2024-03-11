document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
    const fullDateText = today.toLocaleDateString('de-DE', options);
    const dayName = today.toLocaleDateString('de-DE', { weekday: 'long' });

    document.getElementById('full-date').textContent = fullDateText.split(', ')[1]; // Displays "DD.MM.YYYY"
    document.getElementById('day-name').textContent = dayName; // Displays "weekday"

    fetch('https://unrivaled-hotteok-3a63d5.netlify.app/.netlify/functions/fetch-todos')
    .then(response => response.json())
    .then(data => {
        const listElement = document.getElementById('todo-list');
        listElement.innerHTML = ''; // Clear previous content

        const todayFormatted = today.toISOString().split('T')[0];

        data.results.forEach(item => {
            // Assuming your date is stored in 'Datum' and formatted as 'YYYY-MM-DD'
            const itemDate = item.properties.Datum?.date?.start;
            if (itemDate === todayFormatted) {
                const titleText = item.properties.Job?.title[0]?.plain_text || 'Untitled';
                const listItem = document.createElement('div');
                listItem.classList.add('todo');
                listItem.textContent = `-> ${titleText}`;
                listElement.appendChild(listItem);
            }
        });

        if (!listElement.hasChildNodes()) {
            listElement.textContent = 'No todos for today.';
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
