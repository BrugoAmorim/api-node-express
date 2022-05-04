
const Express = require('express');
const myapp = Express();

module.exports = { Express, myapp };

myapp.listen(5000, function(){

    console.log("Servidor Rodando");
})