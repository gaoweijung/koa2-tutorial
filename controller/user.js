const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../db/model/user');
const { jwtKey } = require('../config');

class UserController {
    /**
     * 注册账号
     */
    static async signUp(ctx, next) {
        console.log(ctx.request.body);
        const { name, email, password, rePassword } = ctx.request.body;
        const errMsg = [];
        !email && errMsg.push('邮箱地址为空');
        !password && errMsg.push('密码为空');
        !rePassword && errMsg.push('重复密码为空');
        if (password !== rePassword) errMsg.push('密码与重复密码不一致');
        if (errMsg.length) {
            ctx.response.body = {
                status: 304,
                data: {
                    errorMessages: errMsg
                }
            };
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = { name, email, password: hashedPassword };
            try {
                const result = await UserModel.create(user);
                ctx.response.body = result;
                await next();
            } catch (e) {
                if (e.message.includes('E11000 duplicate key error collection:')) {
                    ctx.response.body = {
                        status: 304,
                        data: {
                            message: '邮箱或者用户名重复'
                        }
                    };
                } else {
                    ctx.response.body = e.message;
                }
            }
        }
    }

    /**
     * 登录
     */
    static async login(ctx, next) {
        const { email, password } = ctx.request.body;
        const errorMessages = [];
        email || errorMessages.push('邮箱地址为空');
        password || errorMessages.push('密码为空');
        const user = await UserModel.findOne({ email });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) errorMessages.push('密码不正确');
        if (errorMessages.length) {
            ctx.response.body = {
                status: 304,
                data: {
                    errorMessages
                }
            };
        } else {
            const payload = {
                email,
                createdTime: new Date().getTime(),
                timeout: 1000 * 60 * 60 * 24 * 30
            };
            const token = jwt.sign(payload, jwtKey);
            ctx.response.body = {
                status: 200,
                message: '登录成功',
                data: { token }
            };
            await next();
        }
    }

    /**
     * 给邮件发送code
     * @param email 邮箱
     * @returns {Promise<void>}
     */
    static async sendEmailCode(email) {

    }
}

module.exports = UserController;
