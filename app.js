// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');  // Import path module to serve static files

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files (index.html, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));  // Serve files from the 'public' directory

// API route
const sendMessageRoute = require('./api/send-message');
app.use('/api/send-message', sendMessageRoute);

// Catch-all route to handle requests to root (`/`)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Ensure index.html is served at root
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
