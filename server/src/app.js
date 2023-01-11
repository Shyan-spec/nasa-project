const express = require('express');
const { planetsRouter } = require('./routes/planets/planets.router');
const cors = require('cors');
//Node.js middleware to allow cross origin

//Middlware that handle requests as they come in to the application
const app = express();

app.use(cors( {
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(planetsRouter);

module.exports = {
    app
}
