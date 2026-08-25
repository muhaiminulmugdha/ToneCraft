const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, client-side JS, images) from a 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Basic Home Route
app.get('/', (req, res) => {
    res.send("Tone Craft");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running smoothly at http://localhost:${PORT}`);
});