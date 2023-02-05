const http = require('http')

const app = require('./app');
//allows us to handle more types of connections (like websockets)



const {mongoConnect} =require('./services/mongo')

const {loadPlanetsData} = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)


//fucntion waits for loadPlanetsData promise to finish before the server responds to the user
async function startServer(){
   await mongoConnect();
await loadPlanetsData();

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});
}

startServer();

