import Jabatan from "../models/JabatanModel.js"

export const getJabatan = async (req, res) =>{
    try {
        const response = await Jabatan.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getJabatanById = async (req, res) =>{
    try {
        const response = await Jabatan.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createJabatan = async (req, res) =>{
    const jabatan = await Jabatan.findOne({
        where:{
            name: req.body.name
        }
    })
    const {name} = req.body;
    if(jabatan) return res.status(400).json({msg: 'Nama sudah ada!'})
    try {
        await Jabatan.create({
            name: name,
        });
        res.status(201).json({msg: "Job created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateJabatan = async (req, res) =>{
    const jabatan = await Jabatan.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!jabatan) return res.status(404).json({msg: 'Nama job tidak terdaftar'})
    const {name} = req.body;
    try {
        await Jabatan.update({
            name: name
        });
        res.status(201).json({msg: "Job updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteJabatan = async (req, res) =>{
    const jabatan = await Jabatan.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!jabatan) return res.status(404).json({msg: 'Nama job tidak terdaftar'})
    try {
        await Jabatan.destroy({
            where:{
                id: jabatan.id
            }
        });
        res.status(200).json({msg: "Job deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}