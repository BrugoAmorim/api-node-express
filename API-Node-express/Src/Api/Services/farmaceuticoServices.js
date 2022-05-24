
const validador = require('validator');
const tbFarmaceuticos = require('../Models/tbfarmaceutico');

async function buscarRegistro(req){

    const registro = await tbFarmaceuticos.findByPk(req);
    if(registro === null)
        return Promise.reject('Registro não encontrado');
    else
        return req;
}

async function validarCamposFarmaceutico(req){

    if(validador.isLength(req.farmaceutico, {min: 4}) === false)
        return Promise.reject('É preciso informar um nome válido')

    if(validador.isLength(req.cpf, {min: 12, max: 15}) === false)
        return Promise.reject('Cpf inválido');
    
    if(validador.isLength(req.rg, {min: 9, max: 12}) === false)
        return Promise.reject('Rg inválido');

    if(validador.isDate(req.nascimento, {strictMode: false}) === false)
        return Promise.reject('Data de nascimento inválida');

    if(validador.isMobilePhone(req.telefone, ['pt-BR'], {strictMode: true}) === false)
        return Promise.reject('Número de telefone inválido')

    else
        return req;
}

module.exports = {buscarRegistro, validarCamposFarmaceutico};