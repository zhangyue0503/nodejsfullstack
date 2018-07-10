const log4js = require('log4js');
module.exports = {
    log: (info) => {
        log4js.configure({
            appenders: {
                out: {
                    type: 'stdout'
                }, //设置是否在控制台打印日志
                info: {
                    type: 'file',
                    filename: './logs/info.log'
                }
            },
            categories: {
                default: {
                    appenders: ['out', 'info'],
                    level: 'info'
                }
            }
        });

        const logger = log4js.getLogger('info');
        logger.info(info);
    }
};