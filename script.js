const content = document.getElementById('content');

function loadPage() {
    const path = window.location.pathname.split('/').filter(Boolean);
    const siteName = path[0];
    const filePath = path[1] || 'index.html';

    if (!siteName) return;

    fetch('websites.json')
        .then(response => response.json())
        .then(data => {
            const site = data.find(site => site.name === siteName);
            if (site) {
                fetch(site.url + '/' + filePath)
                    .then(response => response.text())
                    .then(html => {
                        content.innerHTML = html;
                    })
                    .catch(error => {
                        content.innerHTML = `<p>Failed to load content: ${error}</p>`;
                    });
            } else {
                content.innerHTML = '<p>Website not found</p>';
            }
        });
}

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

window.addEventListener('popstate', loadPage);
window.addEventListener('load', loadPage);
