const app = require('express').Router()
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


//gets data from db
app.get('/', (req, res) => {
    readFromFile('../db/db.json')
        .then((data) => res.json(JSON.parse(data)))
        .catch((err) => res.json('Error reading the file'));
});

app.post('/', (req, res) => {
    const { title, text } = req.body

    if (title && text) {
        const newNotes = {
            title,
            text,
            id: uuidv4(),
        }
        readAndAppend(newNotes, '../db/db.json')
            .then(() => {


                const response = {
                    status: 'success',
                    body: newNotes,
                };

                res.json(response);
            })
            .catch((err) => res.json('Error appending to the file'));
    } else {
        res.json('Title and text are required');
    }

});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('../db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const initialLength = json.length;
            const result = json.filter((note) => note.id !== noteId);

            if (initialLength === result.length) {
                return res.json(`Status: Note with ID ${noteId} not found`);
            }

            writeToFile('../db/db.json', JSON.stringify(result));
            res.json(`Status: Note ${noteId} has been deleted`);
        })
        .catch((err) => res.json('Error reading file'));
});


module.exports = app;