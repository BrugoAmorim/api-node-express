
const myapp = require('../app.js').myapp;

const controller = require('../Api/Controller/main.js');

myapp.get('/remedios', controller.buscarMedicamentos);

myapp.post('/nv-remedio', controller.novoMedicamento);

myapp.put('/att-remedio/:id', controller.updateMedicamento);

myapp.delete('/del-remedio/:id', controller.apagarMedicamento);