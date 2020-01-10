module.exports = {
    /**
     * 登录服务
     * @param name 姓名
     * @param password 密码
     * @returns {Promise<string>}
     */
    async login(name, password) {
        let data = '';
        if (name === 'gaoweijung' && password === '1204') {
            data = `hello, ${name}`;
        } else {
            data = '账号密码信息错误';
        }
        return data;
    }
};
