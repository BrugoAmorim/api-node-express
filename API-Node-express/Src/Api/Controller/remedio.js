
const express = require('../../app.js').Express
const myapp = require('../../app.js').myapp;
myapp.use(express.json()); // faz com que minha API entenda objetos json

const { validationResult } = require('express-validator');
const Medicamentos = require('../Models/tbremedio.js');
const conversorModelos = require('../Utils/conversorMedicamentos.js');

async function buscarMedicamentos(req, res){

    // recebe o valor do parametro informado na url
    let { nome } = req.query;

    // se nao houver nenhum parametro informado, é retornado todos os registros do banco
    if(nome === ""){
    
        // Faz uma selecao de todos os registros da minha tabela
        Medicamentos.findAll().then((registros) => {
            
            // metodo que verifica se o numero de registros retornado no banco é zero
            const validarGet = require('../Services/remedioServices.js');
            let model = validarGet.validarConsulta(registros);
            
            // se retornar um codigo 404 do model, é retornado um badrequest ao client
            if(model.codigo == 404)
                return res.status(404).json(model);
            else{

                // converte o modelo table medicamentos em um formato customizado response
                let caixote = conversorModelos.modelolistaMedicamentos(registros);
                return res.status(200).json(caixote);
            }
        })
    }
    else{
    
        // Filtra os registros do banco de acordo com o nome informado
        Medicamentos.findAll({

            where: {nm_medicamento: nome}
        }).then((registros) => {
            
            // metodo que verifica se o numero de registros retornado no banco é zero
            const validarGet = require('../Services/remedioServices.js');
            let model = validarGet.validarConsulta(registros);
            
            // se retornar um codigo 404 do model, é retornado um badrequest ao client
            if(model.codigo == 404)
                return res.status(404).json(model);
            else{

                // converte o modelo table medicamentos em um formato customizado response
                let caixote = conversorModelos.modelolistaMedicamentos(registros);
                return res.status(200).json(caixote);
            }
        })
    }
}     
    
async function novoMedicamento(req, res){

    const validar = validationResult(req);
    if(!validar.isEmpty()){
        const  error = [];
        validar.array().forEach(x => error.push({motivo: x.msg}));

        return res.status(400).json({codigo: 400, error});
    }
    else{
        // atributos do meu objeto JSON
        const {remedio} = req.body;
        const {preco} = req.body;
        const {descricao} = req.body;
        const {produtora} = req.body;
        const {registro} = req.body;

        await Medicamentos.create({

            nm_medicamento: remedio,
            vl_medicamento: preco,
            ds_medicamento: descricao,
            nm_produtora: produtora,
            nr_registro: registro
        }).then((informacoes) => {

            let objRes = conversorModelos.modelounicoMedicamentos(informacoes);
            return res.status(200).json(objRes);
        })
    }   
};

async function apagarMedicamento(req, res){

    const validar = validationResult(req);
    if(!validar.isEmpty()){

        // cria um objeto errorResponse, ele retorna ao cliente o valor do parametro, tipo de erro e seu codigo de badrequest 
        let modelError = {};
        validar.array().map((item) => {
            
            modelError.erro = item.msg;
            modelError.valor = item.value;
            modelError.codigo = 400;
        });

        return res.status(400).json(modelError);
    }
    else
    {   
        // a tabela medicamentos filtrará o registro que contem o id informado, logo após ele é apagado e uma mensagem é enviada informando que foi excluido com exito
        await Medicamentos.destroy({ where: {id_medicamento: req.params.id} }).then(function(){

            return res.status(200).json({mensagem: "Deletado com sucesso!", codigo: 200});
        });
    }
}

async function updateMedicamento(req, res){

    const validar = validationResult(req);
    if(!validar.isEmpty()){
        const errors = [];
        validar.array().map(x => errors.push({motivo: x.msg}));

        return res.status(400).json({codigo: 400, errors});
    }
    else{
        // atributos do meu objeto JSON
        const {remedio} = req.body;
        const {preco} = req.body;
        const {descricao} = req.body;
        const {produtora} = req.body;
        const {registro} = req.body;

        // O metodo update recebe 2 parametros, o primeiro sao os campos da tabela aos quais serao alterados, e no segundo objeto nós informamos o id do registro que sera atualizado
        await Medicamentos.update({

            nm_medicamento: remedio,
            vl_medicamento: preco,
            ds_medicamento: descricao,
            nm_produtora: produtora,
            nr_registro: registro,
        },
        {
            where:{
                id_medicamento: req.params.id
            }
        });

        // depois de atualizado, é exibido as informacoes do registro
        Medicamentos.findByPk(req.params.id).then((data) => {

            let modeloRes = conversorModelos.modelounicoMedicamentos(data);
            return res.status(200).json(modeloRes);
        })
    }
}

module.exports = { buscarMedicamentos, novoMedicamento, apagarMedicamento, updateMedicamento };