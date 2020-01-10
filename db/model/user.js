const mongoose = require('mongoose');
const connection = require('../../db');

// 创建schema
const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});

// 创建model
const UserModel = connection.model('User', userSchema);

module.exports = UserModel;
