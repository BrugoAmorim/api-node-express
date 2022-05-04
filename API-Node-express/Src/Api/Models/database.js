
const Sequelize = require('sequelize');
const banco = new Sequelize('apinode', 'root', '12345', {host: "localhost", dialect: "mysql"});

module.exports = {Sequelize, banco};

banco.authenticate().then(function(){

    // console.log("Banco Conectado")
}).catch(function(error){

    // console.log(error);
})