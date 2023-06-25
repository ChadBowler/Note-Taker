if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const path = require('path');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
// app.use(express.static(path.join(__dirname, 'Develop')));

// console.log(__dirname);

//routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
});

app.listen(process.env.PORT || 3000);
