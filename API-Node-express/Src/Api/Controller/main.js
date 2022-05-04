
const express = require('../../app.js').Express
const myapp = require('../../app.js').myapp;
myapp.use(express.json()); // faz com que minha API entenda objetos json

const Medicamentos = require('../Models/tbremedio');

myapp.get("/remedios", function(req, res){

    // Faz uma selecao de todos os registros da minha tabela
    Medicamentos.findAll().then((registros) => {

        // esta variavel guardará todas as informacoes retornadas
        let colecao = [];

        for(let i = 0; i < registros.length; i++){

            let info = registros[i];
            colecao.push(info);
        }

        console.log(colecao)
        return res.status(200).json(colecao);
    })
})

myapp.post("/nv-remedio", async (req, res) => {

    // atributos do meu objeto JSON
    const {remedio} = req.body;
    const {preco} = req.body;
    const {descricao} = req.body;
    const {produtora} = req.body;
    const {registro} = req.body;

    const informacoes = await Medicamentos.create({
        nm_medicamento: remedio,
        vl_medicamento: preco,
        ds_medicamento: descricao,
        nm_produtora: produtora,
        nr_registro: registro
    });

    let caixote = informacoes;
    return res.status(201).json(caixote);
});

myapp.delete('/del-remedio/:id', async function(req, res){

    // a tabela medicamentos filtrará o registro que contem o id informado, logo após ele é apagado e uma mensagem é enviada informando que foi excluido com exito
    
    await Medicamentos.destroy({ where: {id_medicamento: req.params.id} }).then(function(){

        return res.status(200).json("Deletado com sucesso!");
    })
})

myapp.put('/update/:id', async function(req, res){

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
    Medicamentos.findAll({where: {id_medicamento: req.params.id}}).then((data) => {

        return res.status(200).json(data);
    })
        
})