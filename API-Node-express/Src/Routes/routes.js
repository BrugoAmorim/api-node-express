
const myapp = require('../app.js').myapp;

const { body, param } = require('express-validator');

// Rotas para a tabela Medicamentos

const controlRemedio = require('../Api/Controller/remedio.js');
const validar = require('../Api/Services/remedioServices');

myapp.get('/remedios', controlRemedio.buscarMedicamentos);

myapp.post('/novo-remedio', 
    [
        // Validações da minha rota
        body().custom((data) => { return validar.validarCampoRemedios(data) }).withMessage()
    ],
    controlRemedio.novoMedicamento);

myapp.put('/att-remedio/:id', 
    [
        param('id').custom((data) => { return validar.validarRegistro(data) }).withMessage(),
        body().custom((data) => { return validar.validarCampoRemedios(data) }).withMessage()
    ],
    controlRemedio.updateMedicamento);

myapp.delete('/del-remedio/:id',
    [
        param('id').custom((data) => {return validar.validarRegistro(data)}).withMessage()
    ],
    controlRemedio.apagarMedicamento);

    
// Rotas para a tabela Farmaceuticos

const controlFarmaceutico = require('../Api/Controller/farmaceuticos.js');
const validacoes = require('../Api/Services/farmaceuticoServices');

myapp.get('/buscar-farmaceuticos', controlFarmaceutico.buscarFarmaceuticos);

myapp.post('/reg-farmaceutico', 
    [
        body().custom((data) => { return validacoes.validarCamposFarmaceutico(data) }).withMessage(),
    ],
    controlFarmaceutico.registrarFarmaceutico)

myapp.delete('/apagar-farmaceutico/:id', 
    [
        param('id').custom((data) => { return validacoes.buscarRegistro(data) }).withMessage()
    ],
    controlFarmaceutico.deletarFarmaceutco);

myapp.put('/editar-informacoes/:id', 
    [
        param('id').custom((data) => { return validacoes.buscarRegistro(data) }).withMessage(),
        body().custom((data) => { return validacoes.validarCamposFarmaceutico(data) } ).withMessage()
    ],
    controlFarmaceutico.editarFarmaceutico);