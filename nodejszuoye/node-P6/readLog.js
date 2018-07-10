var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./server.log');
var rl = readline.createInterface(instream, new stream);
var pathCountMap = {};

rl.on('line', function (line) {
    if (/2018-06-21/.test(line) && /GET/.test(line)) {
        var path = line.split(' ')[3];
        pathCountMap[path] = (pathCountMap[path] || 0) + 1
    }
});

rl.on('close', function () {
    console.log(pathCountMap);
})