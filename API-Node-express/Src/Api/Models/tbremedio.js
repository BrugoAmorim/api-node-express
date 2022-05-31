
const Sequelize = require('./database.js').Sequelize;
const banco = require('./database.js').banco;

const Remedios = banco.define('tb_medicamentos', {

    id_medicamento: {
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nm_medicamento: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    vl_medicamento: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
    },  
    ds_medicamento: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    nm_produtora: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    nr_registro: {
        type: Sequelize.STRING(14),
        allowNull: false
    }
});

module.exports = Remedios;
// Remedios.sync({force: true});