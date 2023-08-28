const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

let notes = []

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  