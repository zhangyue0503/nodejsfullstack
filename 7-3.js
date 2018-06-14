var request  = require('request-promise');
var cheerio = require('cheerio');

var url = 'https://movie.douban.com/cinema/nowplaying/beijing/';

request(url).then(function(data){
    var $ = cheerio.load(data);
    var name = $('.lists li').attr('data-title');
    console.log(name);
}).catch(function(err){

});