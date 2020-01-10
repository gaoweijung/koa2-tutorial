const koaBody = require('koa-body');
const IP = require('ip');
const miSend = require('./mi.send');
const miLog = require('./mi.log');

module.exports = (app) => {
    app.use(miLog({
        env: app.env,
        dir: 'logs',
        appLogLevel: 'debug',
        projectName: 'koa-tutorial',
        serverIP: IP.address()
    }));
    app.use(miSend());
    app.use(koaBody());
};
