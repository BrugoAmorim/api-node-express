
const express = require('../../app').Express;
const myapp = require('../../app').myapp;
myapp.use(express.json());

const { validationResult } = require('express-validator');
const tbFarmaceuticos = require('../Models/tbfarmaceutico');

async function buscarFarmaceuticos(req, res){

    await tbFarmaceuticos.findAll().then((data) => {

        return res.status(200).json(data);
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
            nr_telfone: telefone
        }).then((data) => {

            return res.status(201).json(data);
        })
    }
}

async function deletarFarmaceutco(req, res){

    const validar = validationResult(req);

    if(!validar.isEmpty()){
        const errors = [];
        validar.array().forEach(x => errors.push(x.msg));

        return res.status(400).json({error: errors, codigo: 400});
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
                nr_telfone: telefone,        
            },
            {
                where: {
                    id_farmaceutico: req.params.id
                }
            });

        tbFarmaceuticos.findByPk(req.params.id).then((data) => {

            return res.status(200).json(data);
        });
    }
}

module.exports = { registrarFarmaceutico, buscarFarmaceuticos, deletarFarmaceutco, editarFarmaceutico };