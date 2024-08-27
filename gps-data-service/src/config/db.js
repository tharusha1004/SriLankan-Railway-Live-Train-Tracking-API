const mongoose =  require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.on('open', ()=>{
    console.log('Connected to the MongoDB Database.');
});

module.exports = database;