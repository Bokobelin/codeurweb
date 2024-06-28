document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;

    fetch('websites.json')
        .then(response => response.json())
        .then(data => {
            data.push({ name, url });

            // For demonstration, we will log the updated data to console
            // You would typically send this to a server to save the updated JSON
            console.log(JSON.stringify(data, null, 2));
            
            // Clear the form
            document.getElementById('register-form').reset();
        });
});
