/**
 * This Express.js server simulates a simple dynamic price API.
 *
 * Features:
 * 1. Serves static files (HTML, CSS, JS, images) from the "public" directory.
 * 2. Parses both URL-encoded form data and JSON request bodies.
 * 3. Defines a GET route at "/get-price" that:
 *    - Keeps track of a variable `currentPrice` (starting at 60).
 *    - Randomly adjusts the price by up to ±1 each time the endpoint is called.
 *    - Responds with the updated price formatted as a string (e.g., "$59.8").
 * 4. Starts the server on port 3000 and logs a confirmation message.
 *
 * Goal:
 * To demonstrate how an Express server can handle requests,
 * update server-side data, and return dynamic values to clients.
 */

// Import the 'express' module to create a web server
import express from 'express';

// Create an instance of an Express application
const app = express();

// ----------------------
// Middleware
// ----------------------

// Serve static files (HTML, CSS, JS, images) from the 'public' folder
app.use(express.static('public'));

// Parse URL-encoded bodies (from HTML forms)
// 'extended: true' allows nested objects in form submissions
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (from API clients or fetch requests)
app.use(express.json());

// ----------------------
// Handle GET request to fetch price
// ----------------------

// Initialize a variable to represent the current price
let currentPrice = 60;

// Define a GET route at '/get-price'
app.get('/get-price', (req, res) => {
    // Randomly adjust the price by up to ±1
    currentPrice = currentPrice + Math.random() * 2 - 1;

    // Send back the updated price as a string with a $ sign
    res.send('$' + currentPrice.toFixed(1));
});

// ----------------------
// Start the server
// ----------------------

// Listen on port 3000 and log a message when the server starts
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
