import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize;

const Projects = db.define('projects',{
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    judul:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    deskripsi:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'description is not defined..',
        validate:{
            notEmpty: true,
            len: [3, 2500]
        }
    },
    due:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'IN PROGRESS',
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
})

export default Projects;