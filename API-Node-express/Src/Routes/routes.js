
const myapp = require('../app.js').myapp;

const { body, param } = require('express-validator');
const controller = require('../Api/Controller/main.js');

const validar = require('../Api/Services/validar');

myapp.get('/remedios', controller.buscarMedicamentos);

myapp.post('/nv-remedio', 
    [
        // Validações da minha rota
        body('remedio').custom((data) => {return validar.validarNome(data)}).withMessage(),
        body('preco').custom((data) => {return validar.validarPreco(data)}).withMessage(),
        body('descricao').custom((data) => {return validar.validarDescricao(data)}).withMessage(),
        body('registro').custom((data) => {return validar.validarNrRegistro(data)}).withMessage()
    ],
    controller.novoMedicamento);


myapp.put('/att-remedio/:id', 
    [
        param('id').custom((data) => {return validar.validarRegistro(data)}).withMessage(),
        body('remedio').custom((data) => {return validar.validarNome(data)}).withMessage(),
        body('preco').custom((data) => {return validar.validarPreco(data)}).withMessage(),
        body('descricao').custom((data) => {return validar.validarDescricao(data)}).withMessage(),
        body('registro').custom((data) => {return validar.validarNrRegistro(data)}).withMessage()
    ],
    controller.updateMedicamento);

myapp.delete('/del-remedio/:id', 
    param('id').custom((data) => {return validar.validarRegistro(data)}).withMessage(),
    controller.apagarMedicamento);