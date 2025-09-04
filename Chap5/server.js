// Import the 'express' module to create a web server
import express from 'express';

// Create an instance of an Express application
const app = express();

// ----------------------
// Middleware
// ----------------------

// Serve static files (HTML, CSS, JS, images) from the 'public' folder
app.use(express.static('public'));

// Parse URL-encoded bodies (from HTML form submissions)
// 'extended: true' allows nested objects/arrays
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies (useful for API clients or fetch calls)
app.use(express.json());

// ----------------------
// Handle POST request to validate email
// ----------------------
app.post('/email', (req, res) => {
    // Extract submitted email from form body
    const submittedEmail = req.body.email;

    // Regular expression to validate standard email formats
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // If the email matches the regex, return success response
    if (emailRegex.test(submittedEmail)) {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <div class="alert alert-success" role="alert">
                    That email is valid
                </div>
            </div>
        `);
    }
    // If the email is invalid, return error response
    else {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <div class="alert alert-danger" role="alert">
                    Please enter a valid email address
                </div>
            </div>
        `);
    }
});

// ----------------------
// Start the server
// ----------------------
// Listen on port 3000 and log a message when running
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
