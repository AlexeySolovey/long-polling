const http = require('http');
const fs = require('fs');
const chat = require('./chat');

http.createServer((req, res)=>{
    switch(req.url){
        case '/': 
            console.log('hey');
            sendFile('index.html', res);
            break;
        case '/subscribe':
            chat.subscribe(req, res);
            break;
        case '/publish':
            let body = '';
            req.on('data', function(chank){
                body += chank;
            }).on('end', function(){
                body = JSON.parse(body);
                chat.publish(body.mess);
              res.end('ok');
            })
            break;
        default:
            res.statusCode= 404;
            res.end("Not found");
    }
}).listen(3000);

function sendFile(fileName, res){
    var file =new fs.ReadStream(fileName);
    file.pipe(res);
}
