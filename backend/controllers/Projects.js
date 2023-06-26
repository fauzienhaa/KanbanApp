import Members from "../models/MembersModel.js";
import Projects from "../models/ProjectsModel.js";
import Users from "../models/UsersModel.js";

export const getProjects = async (req, res) =>{
    try {
        const response = await Projects.findAll({
            include:{
                model: Members,
                attributes: ['id','userId', 'projectId', 'jabatanId'],
                include: {
                    model: Users,
                    attributes: ['uuid', 'name', 'role']}
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getProjectById = async (req, res) =>{
    try {
        const response = await Projects.findOne({
            where: {
                id: req.params.id,
            },
            include:{
                model: Members,
                attributes: ['id', 'userId', 'projectId', 'jabatanId'],
                include: {
                    model: Users,
                    attributes: ['uuid', 'name', 'role']
                }
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createProject = async (req, res) =>{
    const judulExist = await Projects.findOne({
        where:{
            judul: req.body.judul
        }
    })
    const {judul, deskripsi, due, status} = req.body;
    if(judulExist) return res.status(400).json({msg: 'Judul sudah ada!'})
    try {
        await Projects.create({
            judul: judul,
            deskripsi: deskripsi,
            due: due,
            status: status
        });
        res.status(201).json({msg: "Project created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateProject = async (req, res) =>{
    const project = await Projects.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!project) return res.status(404).json({msg: 'Project tidak ditemukan'})
    const {judul, deskripsi, due, status} = req.body;
    try {
        await Projects.update({
            judul: judul,
            deskripsi: deskripsi,
            due: due,
            status: status
        });
        res.status(201).json({msg: "Project updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteProject = async (req, res) =>{
    const project = await Projects.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!project) return res.status(404).json({msg: 'Project tidak ditemukan'})
    try {
        await Projects.destroy({
            where:{
                id: project.id
            }
        });
        res.status(200).json({msg: "Project deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}