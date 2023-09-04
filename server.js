const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();
const notesRoutes = require('./routes/notesRoutes');

// Middleware to handle JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Use notesRoutes for API routes
app.use('/api/notes', notesRoutes);

// HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Catch-all for any other routes, redirect to homepage
app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
