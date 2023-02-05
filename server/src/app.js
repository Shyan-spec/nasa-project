const path = require('path')
const express = require('express');

const api = require('./routes/api')

const cors = require('cors');
const morgan = require('morgan')
//Node.js middleware to allow cross origin

//Middlware that handle requests as they come in to the application
const app = express();

app.use(cors( {
    origin: 'http://localhost:3000'
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname,'..', 'public')));
app.use('/v1', api);
//app.use('/v2', api);


app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;

