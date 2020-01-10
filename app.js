const Koa = require('koa');
const router = require('./router/router');
const middleware = require('./midddleware');

const app = new Koa();

middleware(app);
router(app);

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
