// Import the 'express' module to create a web server
import express from 'express';

// Create an instance of an Express application
const app = express();

// Serve static files (like HTML, CSS, JS, images) from the 'public' folder
app.use(express.static('public'));

// Parse URL-encoded bodies (from HTML form submissions)
// 'extended: true' allows rich objects and arrays to be encoded
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies (from API clients or fetch calls)
app.use(express.json());

// Define a route for GET requests to '/users'
app.get('/users', async (req, res) => {
    // Add a 2-second delay before sending the response (to simulate slow network/processing)
    setTimeout(async () => {
        // Read 'limit' from query params (e.g., ?limit=5), default to 10 if not provided
        const limit = +req.query.limit || 10;

        // Fetch a list of users from the JSONPlaceholder fake API with the given limit
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
        );

        // Convert the API response to JSON format
        const users = await response.json();

        // Send back an HTML response with the list of user names
        res.send(`
            <h2>Users</h2>
            <ul class="list-group">
                ${users.map((user) => `<li class="list-group-item">${user.name}</li>`).join('')}
            </ul>
        `);
    }, 2000); // 2000ms = 2 seconds delay
});

// Start the server on port 3000 and log a message when running
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
