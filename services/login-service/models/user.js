const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profile:{
        name: String,
        email: String,
        phone: String,
        address: String,
    },
});

user.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bycrypt.hash(this.password, 10);
        next();
    }
    else{
        next();
    }
});

user.methods.isValidPassword = async function (password){
    return await bycrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', user);