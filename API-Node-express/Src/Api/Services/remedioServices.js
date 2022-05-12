
const validador = require('validator');
const tbMedicamentos = require('../Models/tbremedio');

async function validarRegistro(req){

    await tbMedicamentos.findByPk(req).then(data => {

        if(data === null)
            return Promise.reject('Registro não encontrado');
        else
            return req;
    });
}

async function validarNome(nome){

    if(validador.isLength(nome, {min: 4}) === false)
        return Promise.reject('nome invalido');
    else
        return nome;
}

async function validarNrRegistro(numero){

    if(validador.isLength(numero + "", {min: 8, max: 12}) === false)
        return Promise.reject('numero de registro invalido');
    else
        return numero;
}

async function validarPreco(valor){

    if(validador.isDecimal(valor + "", {force_decimal: false, decimal_digits: 2}) === false)
        return Promise.reject('O preço precisa ter duas casas decimais');
    else 
        return valor;
}

async function validarDescricao(desc){

    if(validador.isLength(desc, {min: 10,max: 50}) === false)
        return Promise.reject('descrição invalida');
    else
        return desc;
}

module.exports = { validarRegistro, validarNome, validarNrRegistro, validarPreco, validarDescricao };