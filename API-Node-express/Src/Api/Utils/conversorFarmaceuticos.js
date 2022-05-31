
function modelounicofarmaceutico(req){

    let Res = {
        idfarmaceutico: req.id_farmaceutico,
        nome: req.nm_farmaceutico,
        cpf: req.ds_cpf,
        rg: req.ds_rg, 
        datanascimento: req.dt_nascimento,
        telefone: req.nr_telefone 
    }

    return Res;
}

function modelolistafarmaceutico(req){

    let colecao = [];
    req.map((item) => {

        let modeloformatado = modelounicofarmaceutico(item);
        colecao.push(modeloformatado);
    })

    return colecao;
}

module.exports = { modelounicofarmaceutico, modelolistafarmaceutico };