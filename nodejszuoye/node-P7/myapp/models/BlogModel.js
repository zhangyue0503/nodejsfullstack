const Sequelize = require('sequelize');
const dbTools = require('./dbTools');
const dbConfig = require('../db.config');

module.exports.getBlogModel = () => {
    return dbTools.sequesize(Sequelize, dbConfig.db_name, dbConfig.db_user, dbConfig.db_pass, dbConfig.db_host, dbConfig.db_dialect).define('blog', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        }
    },{
        tableName:'blog'
    });
}