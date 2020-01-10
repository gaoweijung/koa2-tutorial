const log4js = require('log4js');
const access = require('./access');
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];

/**
 * 默认参数
 */
const baseInfo = {
    appLogLevel: 'debug',
    dir: 'logs',
    env: 'dev',
    projectName: 'koa-tutorial',
    serverIP: '0.0.0.0'
};


module.exports = (options) => {
    const opts = Object.assign({}, baseInfo, options || {});
    const { env, dir, appLogLevel, projectName, serverIP } = opts;
    const commonInfo = { projectName, serverIP };
    const contextLogger = {};
    const appenders = {};
    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
    };

    if (env === 'dev' || env === 'development' || env === 'local') {
        appenders.out = { type: 'console' };
    }

    const config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    };

    log4js.configure(config);
    const logger = log4js.getLogger('cheese');

    return async (ctx, next) => {
        const start = Date.now();
        methods.forEach((method) => {
            contextLogger[method] = (message) => {
                logger[method](access(ctx, message, commonInfo));
            };
        });
        ctx.log = contextLogger;
        await next();
        const end = Date.now();
        const responseTime = `响应时间为${(end - start) / 1000}s`;
        logger.info(access(ctx, { responseTime }, commonInfo));
    };
};
