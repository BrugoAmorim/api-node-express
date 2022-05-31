
const Sequelize = require('./database.js').Sequelize;
const banco = require('./database.js').banco;

const Farmaceuticos = banco.define('tb_farmaceuticos', {

    id_farmaceutico: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nm_farmaceutico: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    ds_cpf: {
        type: Sequelize.STRING(14),
        allowNull: false
    },
    ds_rg: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    dt_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    nr_telefone: {
        type: Sequelize.STRING(30),
        allowNull: false
    }
});

module.exports = Farmaceuticos;
// Farmaceuticos.sync({force: true});