
const myapp = require('../app.js').myapp;

const { body, param } = require('express-validator');

// Rotas para a tabela Medicamentos

const controlRemedio = require('../Api/Controller/remedio.js');
const validar = require('../Api/Services/validar');

myapp.get('/remedios', controlRemedio.buscarMedicamentos);

myapp.post('/nv-remedio', 
    [
        // Validações da minha rota
        body('remedio').custom((data) => {return validar.validarNome(data)}).withMessage(),
        body('preco').custom((data) => {return validar.validarPreco(data)}).withMessage(),
        body('descricao').custom((data) => {return validar.validarDescricao(data)}).withMessage(),
        body('registro').custom((data) => {return validar.validarNrRegistro(data)}).withMessage()
    ],
    controlRemedio.novoMedicamento);


myapp.put('/att-remedio/:id', 
    [
        param('id').custom((data) => {return validar.validarRegistro(data)}).withMessage(),
        body('remedio').custom((data) => {return validar.validarNome(data)}).withMessage(),
        body('preco').custom((data) => {return validar.validarPreco(data)}).withMessage(),
        body('descricao').custom((data) => {return validar.validarDescricao(data)}).withMessage(),
        body('registro').custom((data) => {return validar.validarNrRegistro(data)}).withMessage()
    ],
    controlRemedio.updateMedicamento);

myapp.delete('/del-remedio/:id', 
    param('id').custom((data) => {return validar.validarRegistro(data)}).withMessage(),
    controlRemedio.apagarMedicamento);

    
// Rotas para a tabela Farmaceuticos

const controlFarmaceutico = require('../Api/Controller/farmaceuticos.js');

myapp.get('/buscar-farmaceuticos', controlFarmaceutico.buscarFarmaceuticos);

myapp.post('/reg-farmaceutico', 
    [
        body('farmaceutico').isLength({min: 4}).withMessage('é preciso informar um nome'),
        body('cpf').isLength({min: 12, max: 15}).withMessage('cpf inválido'),
        body('rg').isLength({min: 9, max: 12}).withMessage('rg inválido'),
        body('nascimento').isDate({strictMode: false, delimiters: ['/']}).withMessage('data de nascimento inválida'),
        body('telefone').isMobilePhone(['pt-BR'], {strictMode: true}).withMessage('numero de telefone invalido')
    ],
    controlFarmaceutico.registrarFarmaceutico)