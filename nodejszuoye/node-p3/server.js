const http = require('http');
const url = require('url');
const ejs = require('ejs');


const instance = async (req,res)=>{

    const blogUrl = url.parse(req.url, true);
    const pathname = blogUrl.pathname;
    const query = blogUrl.query;
    const path = blogUrl.path;

    let data; // 返回数据
    res.statusCode = 404;

    if(pathname !== '/blog'){
        return res.end('Error Path: '+ path);    
    }
    if(query.id){
        try {
            const params = { msg: path };
            data = await ejs.renderFile(`blog${query.id}.html`, params);
        }
        catch (error) {
            res.end('Error Path:' + path);
        }
    }else {
        data = await ejs.renderFile('list.html');
    }
    res.statusCode = 200;
    res.end(data);
};


const port = 3000;
const hostname = 'localhost';

const server = http.createServer(instance);

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});