const mongoose = require('mongoose');

// 连接到mongodb数据库
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true});

// 监听连接到数据库的事件
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error'));
dbConnection.once('open', () => {
    console.log('connected');
});
