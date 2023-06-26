import { Sequelize } from "sequelize";

const db = new Sequelize('takanbanapp30', 'postgres', 'komputer12', {
    host: "localhost",
    dialect: "postgres"
})

export default db;