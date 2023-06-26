import Users from "../models/UsersModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) =>{
    try {
        const response = await Users.findAll({
            attributes:['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await Users.findOne({
            attributes:['id', 'name', 'email', 'role'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) =>{
    const user = await Users.findOne({
        where:{
            email: req.body.email
        }
    })
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: 'Confirm password tidak cocok'})
    const hashPassword = await argon2.hash(password);
    if(user) return res.status(400).json({msg: 'Email sudah terdaftar!'})
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register user berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async (req, res) =>{
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: 'User tidak ditemukan'})
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null ){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: 'Confirm password tidak cocok'})
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Update user berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async (req, res) =>{
    const user = await Users.findOne({
        where: {
            uuid: req.params.uuid
        }
    });
    if(!user) return res.status(404).json({msg: 'User tidak ditemukan'})
    try {
        await Users.destroy({
            where:{
                uuid: user.uuid
            }
        });
        res.status(200).json({msg: "Delete user berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}