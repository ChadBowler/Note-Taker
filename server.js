if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express();

app.listen(process.env.PORT || 3000);
