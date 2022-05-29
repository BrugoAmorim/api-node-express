
function modelounicoMedicamentos(req){

    let Res = {
        
        idmedicamento: req.id_medicamento,
        remedio: req.nm_medicamento,
        preco: req.vl_medicamento,
        descricao: req.ds_medicamento,
        fabricante: req.nm_produtora,
        registro: req.nr_registro
    };

    return Res;
}

function modelolistaMedicamentos(colecao){

    let lista = [];
    colecao.forEach(x => {
        lista.push(modelounicoMedicamentos(x));
    });

    return lista;
}

module.exports = { modelounicoMedicamentos, modelolistaMedicamentos };