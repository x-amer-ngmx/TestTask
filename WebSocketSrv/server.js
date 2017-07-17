let net = require('net'),
    http = require('http'),
    url = require('url'),
    sockjs  = require("sockjs"),
    sock_option = {sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'},
    sock_srv = sockjs.createServer(sock_option),

    tcp_url = process.env.API_PORT,
    url_is = tcp_url !== undefined ? url.parse(tcp_url) : undefined,

    api_host = url_is !== undefined ? url_is.hostname : '0.0.0.0',
    api_port = url_is !== undefined ? url_is.port : 7344;

console.log(
    api_host +'/n'+
    api_port
);

sock_srv.on('connection', function (conn) {

    // Для каждого клиента поднимаем своё сокет соединение.
    // Если переменную client вынести в объявление глобальных переменных
    // то результат работы генератора, и разрыва соединений
    // будет транслироваться на все клиенты))) Багу исправил, осознал свои ошиБоки))
    let client = net.Socket();
    client.setEncoding('utf8');

    console.log("is connected");

    //---------
    client.connect(api_port, api_host, ()=> {
        client.write('\n',()=>{

            conn.on('data', function (message) {
                client.write('\n');
                console.log("get data:"+message);
            });
        });

    });

    client.on('data',(data)=>{
        conn.write(data);
        console.log(data);
    });

    client.on('close',()=>{
        console.log('Connection is closed');
    });
    //---------

    conn.on('close', function () {
        console.log("connection close");
        client.destroy();
    });
});

var server = http.createServer();
sock_srv.installHandlers(server,{prefix:'/random'});
server.listen(3333,'0.0.0.0');