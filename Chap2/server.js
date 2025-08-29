import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// ----------------------
// Handle POST BMI request (all inline)
// ----------------------
app.post('/calculate', (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);

    if (!height || !weight) {
        return res.send("<p>Please provide both height and weight.</p>");
    }

    const bmi = weight / (height * height);

    let category;
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Healthy Weight";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    res.send(`
        <p>Your BMI is <strong>${bmi.toFixed(1)}</strong> therefore you are <strong>${category}</strong>.</p>
        <p></p>
    `);
});

// ----------------------
// Start the server
// ----------------------
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
