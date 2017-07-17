/**
 * Created by mongo on 08.07.17.
 */
var http = require('http'),
    n_stat = require('node-static'),
    stat_dir = new n_stat.Server(__dirname),
    server = http.createServer();

server.addListener('request',function (req, res) {
    stat_dir.serve(req,res);
});

server.addListener('upgrade',function (req, res) {
    res.end();
});

server.listen(8383,'0.0.0.0');