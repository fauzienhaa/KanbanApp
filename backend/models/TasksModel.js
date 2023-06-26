import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Members from "./MembersModel.js";
import Section from "./SectionModel.js";

const { DataTypes } = Sequelize;

const Tasks = db.define('tasks',{
    
    judul:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    due:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true,
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
    completeAt:{
        type: DataTypes.DATE,
    },
    position:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    bobot:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    sectionId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
})

Section.hasMany(Tasks);
Tasks.belongsTo(Section, {foreignKey: 'sectionId'})
Members.belongsToMany(Tasks, { through: 'MemberOnTask'})
Tasks.belongsToMany(Members, { through: 'MemberOnTask'})

export default Tasks;