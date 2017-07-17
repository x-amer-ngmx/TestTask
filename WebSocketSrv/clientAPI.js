var net = require('net'),
    client = new net.Socket();


    client.setEncoding('utf8');

    client.connect(7344,'0.0.0.0', ()=> {
            client.write('\n',()=>{
                process.stdin.resume();
                process.stdin.on('data', (data)=>{
                    if(data.toString() === 'exit\n')
                    {
                        client.destroy();

                    } else client.write('\n');
                })
            });

    });

    client.on('data',(data)=>{
        console.log(data);
    });

    client.on('close',()=>{

        console.log('Connection is closed');
        process.exit();
    });
