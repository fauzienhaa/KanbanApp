import Section from "../models/SectionModel.js";
import Tasks from "../models/TasksModel.js";

export const getSection = async (req, res) =>{
    try {
        const response = await Section.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getSectionByProjectId = async (req, res) => {
    try {
        const response = await Section.findAll({
            where: {
                projectId: req.params.id,
            },
            include: {
                model: Tasks,
                attributes: ['id', 'judul', 'due', 'deskripsi', 'position']
            }
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getSectionById = async (req, res) =>{
    try {
        const response = await Section.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//api get data tasks == controller tasks.js
//api update tasks == controller tasks.js

export const createSection = async (req, res) =>{
    const section = await Section.findOne({
        where:{
            judul: req.body.name
        }
    })
    const {name, projectId} = req.body;
    if(section) return res.status(400).json({msg: 'Name already exist!'})
    try {
        await Section.create({
            judul: name,
            projectId: projectId,
        });
        res.status(201).json({msg: "Section created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateSection = async (req, res) =>{
    const section = await Section.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!section) return res.status(404).json({msg: 'No Section Available'})
    const {name} = req.body;
    try {
        await Section.update({
            judul: name,
        });
        res.status(201).json({msg: "Job updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteSection = async (req, res) =>{
    const section = await Section.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!section) return res.status(404).json({msg: 'No Section Available'})
    try {
        await Section.destroy({
            where:{
                id: section.id
            }
        });
        res.status(200).json({msg: "Job deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}