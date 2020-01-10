const mongoose = require('mongoose');
const config = require('../config');

const connection = mongoose.createConnection(
    config.mongodbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

connection.on('open', () => { console.log('打开数据库连接')});
connection.on('error', (e) => { console.log(`error: ${e}`)});

module.exports = connection;
