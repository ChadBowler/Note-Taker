if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('Develop'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
})

app.listen(process.env.PORT || 3000);
