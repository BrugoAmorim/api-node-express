
const express = require('../../app').Express;
const myapp = require('../../app').myapp;
myapp.use(express.json());

const { validationResult } = require('express-validator');
const tbFarmaceuticos = require('../Models/tbfarmaceutico');

// Utils farmaceutico
let criarmodelos = require('../Utils/conversorFarmaceuticos.js');

async function buscarFarmaceuticos(req, res){

    await tbFarmaceuticos.findAll().then((colecao) => {

        // validador para verificar se há registros na table farmaceuticos
        const validacoes = require('../Services/remedioServices.js');
        let validarcolecao = validacoes.validarConsulta(colecao);

        if(validarcolecao.codigo == 400)
            return res.status(400).json(validarcolecao);
        else{
            
            let listafarmaceuticos = criarmodelos.modelolistafarmaceutico(colecao);
            return res.status(200).json(listafarmaceuticos);
        }
    })
}

async function registrarFarmaceutico(req, res){

    const validar = validationResult(req);
    if(!validar.isEmpty()){
        const errors = [];
        validar.array().forEach(x => errors.push(x.msg))
        
        return res.status(400).json({erro: errors, codigo: 400})
    }
    else{
        // campos do meu objeto JSON request
        const {farmaceutico} = req.body;
        const {cpf} = req.body;
        const {rg} = req.body;
        const {nascimento} = req.body;
        const {telefone} = req.body;

        await tbFarmaceuticos.create({

            nm_farmaceutico: farmaceutico,
            ds_cpf: cpf,
            ds_rg: rg,
            dt_nascimento: nascimento,
            nr_telefone: telefone
        }).then((data) => {

            let objres = criarmodelos.modelounicofarmaceutico(data);
            return res.status(201).json(objres);
        })
    }
}

async function deletarFarmaceutco(req, res){

    const validar = validationResult(req);

    if(!validar.isEmpty()){
    
        // cria um objeto ErrorResponse
        let modelError = {};

        // faz um mapeamento do modelo padrao badrequest e pega os valores necessarias para criar um modelo customizado
        validar.array().map((item) => {

            modelError.erro = item.msg;
            modelError.valor = item.value;
            modelError.codigo = 400;
        })

        return res.status(400).json(modelError);
    }
    else{
        await tbFarmaceuticos.destroy({ where: {id_farmaceutico: req.params.id}}).then(() => {

            return res.status(200).json({mensagem: 'Deletado com sucesso!', codigo: 200});
        })
    }
}

async function editarFarmaceutico(req, res){

    const validar = validationResult(req);
    if(!validar.isEmpty()){
        const errors = [];
        validar.array().map(x => errors.push({motivo: x.msg}));

        return res.status(400).json({codigo: 400, errors});
    }
    else{
        
        let {farmaceutico} = req.body;
        let {cpf} = req.body;
        let {rg} = req.body;
        let {nascimento} = req.body;
        let {telefone} = req.body;

        // No metodo update, primeiro entra os campos que eu quero alterar, seguido do registro que vai ser alterado
        await tbFarmaceuticos.update(
            {
                nm_farmaceutico: farmaceutico,
                ds_cpf: cpf,
                ds_rg: rg,
                dt_nascimento: nascimento,
                nr_telefone: telefone,        
            },
            {
                where: {
                    id_farmaceutico: req.params.id
                }
            });

        tbFarmaceuticos.findByPk(req.params.id).then((data) => {

            let objresFarmaceutico = criarmodelos.modelounicofarmaceutico(data);
            return res.status(200).json(objresFarmaceutico);
        });
    }
}

module.exports = { registrarFarmaceutico, buscarFarmaceuticos, deletarFarmaceutco, editarFarmaceutico };