var request  = require('request-promise');
var cheerio = require('cheerio');

var url = 'https://movie.douban.com/cinema/nowplaying/beijing/';
// request.get(url,function(err,data){
//     console.log(data);
// });

request(url).then(function(data){
    // console.log(data);
    var $ = cheerio.load(data);
    // console.log($('.title').html());
    var name = $('.lists li').attr('data-title');

    console.log(name);


}).catch(function(err){

});