
const myapp = require('../app.js').myapp;

const { body, param } = require('express-validator');

// Rotas para a tabela Medicamentos

const controlRemedio = require('../Api/Controller/remedio.js');
const validar = require('../Api/Services/remedioServices');

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
const validacoes = require('../Api/Services/farmaceuticoServices');

myapp.get('/buscar-farmaceuticos', controlFarmaceutico.buscarFarmaceuticos);

myapp.post('/reg-farmaceutico', 
    [
        body().custom((data) => { return validacoes.validarCampos(data) }).withMessage(),
    ],
    controlFarmaceutico.registrarFarmaceutico)

myapp.delete('/apagar-farmaceutico/:id', 
    [
        param('id').custom((data) => { return validacoes.buscarRegistro(data)}).withMessage()
    ],
    controlFarmaceutico.deletarFarmaceutco);

myapp.put('/editar-informacoes/:id', 
    [
        param('id').custom((data) => { return validacoes.buscarRegistro(data) }).withMessage(),
        body().custom((data) => { return validacoes.validarCampos(data)}).withMessage()
    ],
    controlFarmaceutico.editarFarmaceutico);