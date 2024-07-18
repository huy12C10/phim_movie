// server.js

const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'client/build' directory
app.use(express.static(path.resolve(__dirname, 'client/build')));

// Serve the React application on all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
