import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize;

const Jabatan = db.define('jabatan',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
},{
    freezeTableName: true
})

export default Jabatan;