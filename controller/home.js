const homeService = require('../service/home');

module.exports = {
    // 首页
    index: async (ctx) => {
        ctx.response.body = '首页';
    },
    // home 页面
    home: async (ctx) => {
        console.log(ctx.params);
        ctx.response.body = 'Home';
    },
    // login页面
    login: async (ctx) => {
        ctx.response.body = `
    <form action="/user/login" method="post">
        <input name="email" type="text" placeholder="请输入姓名，gaoweijung@gmail.com" />
        <br />
        <input name="password" type="text" placeholder="请输入密码，1204" />
        <br />
        <button>let's rush !!!!B</button>
    </form>
    `;
    },
    // 用户登录接口
    userLogin: async (ctx) => {
        console.log(ctx);
        console.log(ctx.request.body);
        let { name, password } = ctx.request.body;
        const data = await homeService.login(name, password);
        ctx.set('Content-type', 'application/json');
        ctx.body = JSON.stringify(data);
    }
};
