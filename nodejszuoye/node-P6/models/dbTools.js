/**
 * db对象
 */
module.exports.sequesize = (Sequelize, dbName, user, pass, host = 'localhost', dialect = 'mysql') => {
    return new Sequelize(dbName, user, pass, {
        host: host,
        dialect: dialect,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
};