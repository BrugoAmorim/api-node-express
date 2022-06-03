
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

async function validarCampoRemedios(req){

    if(validador.isLength(req.remedio, {min: 4}) === false)
        return Promise.reject('Nome inválido');
    
    if(validador.isLength(req.registro, {min: 8, max: 12}) === false)
        return Promise.reject('Numero de registro inválido');
    
    if(validador.isDecimal(req.preco + "", {force_decimal: false, decimal_digits: 2}) === false)
        return Promise.reject('Este preço é inválido');
    
    if(validador.isLength(req.descricao, {min: 10,max: 50}) === false)
        return Promise.reject('descrição inválida');

    if(validador.isLength(req.produtora, {min: 8, max: 50}) === false)
        return Promise.reject('Nome da produtora inválida');

    else
        return req;
}

function validarConsulta(req){

    let objetoRes;
    if(req.length === 0){

        objetoRes = {
            erro: "Não foram encontrados nenhum registro",
            codigo: 404
        };

        return objetoRes;
    }

    return req;
}

module.exports = { validarRegistro, validarCampoRemedios, validarConsulta };