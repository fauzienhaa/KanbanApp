import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Projects from "./ProjectsModel.js";

const { DataTypes } = Sequelize;

const Section = db.define('sections',{
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
    projectId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
})

Projects.hasMany(Section);
Section.belongsTo(Projects, {foreignKey: 'projectId'})

export default Section;