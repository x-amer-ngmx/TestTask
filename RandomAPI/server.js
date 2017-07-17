var net = require('net');
var gen = require('./RandomGen'); // namespace
var srv = net.createServer(function (socket) {

    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    console.log('Client is connection:' + socket.name);


    socket.on('data', function(){

        let v = new gen.vector(2,999).randomVector; // create object and get property
        let result = JSON.stringify(v);
        console.log('Get data: '+result);
        let buf = new Buffer(result);
        socket.write(buf);
    });
    //socket.pipe(socket);
});
//srv.setMaxListeners(999);
srv.listen(7344,'0.0.0.0');