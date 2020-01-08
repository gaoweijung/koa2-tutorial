const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = Router();

app.use(bodyParser());

// 添加路由
router.get('/home/:id/:name', async (ctx) => {
    console.log(ctx.params);
    ctx.response.body = 'Home';
});

router.get('/login', async (ctx) => {
    ctx.response.body = `
    <form action="/user/login" method="post">
        <input name="name" type="text" placeholder="请输入姓名，gaoweijung" />
        <br />
        <input name="password" type="text" placeholder="请输入密码，1204" />
        <br />
        <button>let's rush !!!!B</button>
    </form>
    `;
});

router.post('/user/login', async (ctx) => {
    let { name, password } = ctx.request.body;
    if (name === 'gaoweijung' && password === '1204') {
        ctx.response.body = `hello, ${name}`;
    } else {
        ctx.response.body = '账号密码信息错误';
    }
});

app.use(router.routes());

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
