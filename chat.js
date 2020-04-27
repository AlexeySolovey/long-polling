let clients = [];

exports.subscribe = function(req, res) {
    console.log('subscribe');

    clients.push(res);

    res.on('close', ()=>{
        clients.splice(clients.indexOf(res), 1);
    })
}
exports.publish = (mess) => {
    console.log("publish %s", mess);
    clients.forEach(function(res){
        res.end(mess);
    })

    clients = [];
}

setInterval(()=>{
    console.log(clients.length);
}, 2000)