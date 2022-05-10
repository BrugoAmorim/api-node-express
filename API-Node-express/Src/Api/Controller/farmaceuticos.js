
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
    if(!validar.isEmpty())
        return res.status(404).json({erro: validar.array()})
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

module.exports = { registrarFarmaceutico, buscarFarmaceuticos };