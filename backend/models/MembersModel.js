import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Users from "./UsersModel.js";
import Projects from "./ProjectsModel.js";
import Jabatan from "./JabatanModel.js";

const { DataTypes } = Sequelize;

const Members = db.define('members',{
    
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    projectId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    jabatanId:{
        type: DataTypes.INTEGER,
        // allowNull: false,
        // validate:{
        //     // notEmpty: true,
        // }
    },
},{
    freezeTableName: true
})

Users.hasMany(Members);
Members.belongsTo(Users, {foreignKey: 'userId'})
Projects.hasMany(Members);
Members.belongsTo(Projects, {foreignKey: 'projectId'})
Jabatan.hasMany(Members);
Members.belongsTo(Jabatan, {foreignKey: 'jabatanId'})

export default Members;