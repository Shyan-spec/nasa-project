const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb+srv://shyanw:Wy3b6c7DnPYaTF8q@cluster0.f1jpiqk.mongodb.net/?retryWrites=true&w=majority'


mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready')
})

mongoose.connection.on('error', (err) => {
    console.log('err')
});

async function mongoConnect() {
    await mongoose.connect(MONGODB_URL)
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}