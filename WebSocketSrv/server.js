let net = require('net'),
    http = require('http'),
    url = require('url'),

    sockjs  = require("sockjs"),
    sock_option = {sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'},
    sock_srv = sockjs.createServer(sock_option),
    client = net.Socket(),

    tcp_url = process.env.API_PORT,
    url_is = tcp_url !== undefined ? url.parse(tcp_url) : undefined,

    api_host = url_is !== undefined ? url_is.hostname : '0.0.0.0',
    api_port = url_is !== undefined ? url_is.port : 7344;

console.log(
    api_host +'/n'+
    api_port
);

client.setEncoding('utf8');

client.connect(api_port,api_host, ()=> {
    let isId = '';
    sock_srv.on('connection', function (conn) {


        //console.log(conn);

        console.log("is connected");
        conn.on('data', function (message) {
            isId=conn.id;
            client.write('\n');
            console.log("get data:"+message);

        });
        client.on('data',(data)=>{
            let jon =JSON.parse(data);

            jon.id = isId;
            data = JSON.stringify(jon);
            conn.write(data);
            console.log(data);
        });

        client.on('close',()=>{
            console.log('Connection is closed');
        });
        //---------
        conn.on('close', function () {
            console.log("connection close");
            //client.destroy();
        });

        //conn.pipe(conn);

    });
});



let server = http.createServer();
sock_srv.installHandlers(server,{prefix:'/random'});
server.listen(3333,'0.0.0.0');