if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const path = require('path');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const noteData = require('./Develop/db/db.json');
let fileDirectoryPath = (path.join(__dirname, `Develop/public`))
app.use(express.static(fileDirectoryPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(noteData);
});
//add note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    // console.log(req);
    const { text, title } = req.body;
    if (text && title) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            fileData = JSON.parse(data)
            fileData.push(newNote);
            const newData = JSON.stringify(fileData)

            fs.writeFile('./Develop/db/db.json', newData, (err) => {
                if (err) throw err;
                console.log('New note has been saved!');
            })
          })
          
          const response = {
            status: 'success',
            body: newNote,
          };
      
          res.status(200).sendFile(path.join(__dirname, 'Develop/public/index.html')) 
         
    } else {
        res.status(500).json('Error in posting note');
      }  
});
//delete note
app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    res.json(noteData)
    let currentId = req.params.id;
    for (let i = 0; i < noteData.length; i++) {
        const element = noteData[i];
        if (element.id == currentId) {
            noteData.splice(i, 1);
        }
    }
    const newData = JSON.stringify(noteData)
    fs.writeFile('./Develop/db/db.json', newData, (err) => {
        if (err) throw err;
        console.log('Note has been deleted!');
       
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
});



app.listen(process.env.PORT || 3000);

