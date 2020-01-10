const router = require('koa-router')();
const homeController = require('../controller/home');
const UserController = require('../controller/user');

module.exports = (app) => {
    router.get('/', homeController.index);
    // 添加路由
    router.get('/home/:id/:name', homeController.home);

    router.get('/login', homeController.login);

    router.post('/user/login', UserController.login);

    router.post('/user', UserController.signUp);

    app.use(router.routes())
        .use(router.allowedMethods());
};
