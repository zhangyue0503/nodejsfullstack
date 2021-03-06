const ejs = require('ejs');
const createError = require('http-errors');

function dateFmt(fmt, date) {
    let o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getClientIP(req) {
    let ipAddress;
    let headers = req.headers;
    let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}
async function template(view, data = {}) {
    const params = data;
    return await ejs.renderFile(`./html/${view}.html`, params);
}

function resultRender(view, result, res, next) {
    if (result) {
        res.render(view, result);
    } else {
        next(createError(404));
    }
};

function resultRedirect(result, sucessUrl, errorUrl, res, next) {
    if (result) {
        return res.redirect(sucessUrl);
    } else {
        if(errorUrl == '404'){
            next(createError(404));
        }
        return res.redirect(errorUrl);
    }
};

module.exports = {
    dateFmt: dateFmt,
    getIp: getClientIP,
    template: template,
    resultRender: resultRender,
    resultRedirect: resultRedirect
};