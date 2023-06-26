import Tasks from "../models/TasksModel.js";

export const getTasks = async (req, res) =>{
    try {
        const response = await Tasks.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getTasksById = async (req, res) =>{
    try {
        const response = await Tasks.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createTasks = async (req, res) =>{
    const tasks = await Tasks.findOne({
        where:{
            judul: req.body.name
        }
    })
    const {name, due, description, position, priority, sectionId} = req.body;
    if(tasks) return res.status(400).json({msg: 'Name already exist!'})
    try {
        await Tasks.create({
            judul: name,
            due: due,
            deskripsi: description,
            position: position,
            bobot: priority,
            sectionId: sectionId
        });
        res.status(201).json({msg: "Task created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateTasks = async (req, res) =>{
    const tasks = await Tasks.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!tasks) return res.status(404).json({msg: 'No Task Available'})
    const {name} = req.body;
    try {
        await Tasks.update({
            judul: name,
        });
        res.status(201).json({msg: "Task updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteTasks = async (req, res) =>{
    const tasks = await Tasks.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!tasks) return res.status(404).json({msg: 'No Task Available'})
    try {
        await Tasks.destroy({
            where:{
                id: tasks.id
            }
        });
        res.status(200).json({msg: "Task deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}