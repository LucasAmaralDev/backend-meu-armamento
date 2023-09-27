require('dotenv').config();

module.exports = {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    logging: false,
    define: {
        timestamps: false
    }
}