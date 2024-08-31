const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectionString = `mongodb+srv://tharusha:tharusha123@slr-train-api.qpazb.mongodb.net/?retryWrites=true&w=majority&appName=SLR-Train-API`
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;