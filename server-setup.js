// Server setup for Zubad-port with Chat API
const express = require('express');
const path = require('path');
const cors = require('cors');

// Import the chat API
const chatAPI = require('./chat-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Mount chat API at /api
app.use('/api', chatAPI);

// Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Zubad-port server running on http://localhost:${PORT}`);
    console.log(`Chat API available at http://localhost:${PORT}/api/chat`);
    console.log(`Health check at http://localhost:${PORT}/api/health`);
});

module.exports = app;
