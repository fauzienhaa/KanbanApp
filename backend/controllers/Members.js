import Projects from "../models/ProjectsModel.js";
import Users from "../models/UsersModel.js";
import Jabatan from "../models/JabatanModel.js";
import Members from "../models/MembersModel.js";
import {Op} from "sequelize";

export const getMember = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Members.findAll({
                attributes:['id'],
                include:[{
                    model: Users,
                    attributes: ['name', 'email'],
                },{
                    model: Jabatan,
                    attributes: ['name']
                },{
                    model: Projects,
                    attributes: ['id', 'judul']
                }]
            })
        }else{
            response = await Members.findAll({
                attributes:['id'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                },{
                    
                    model: Jabatan,
                    attributes: ['name']
                },{
                    model: Projects,
                    attributes: ['id', 'judul']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getMemberByProjectId = async (req, res) =>{
    try {
        let response;
        response = await Members.findAll({
            attributes:['id'],
            where:{
                projectId: req.params.id
            },
            include:[{
                model: Users,
                attributes: ['name', 'email']
            },{
                
                model: Jabatan,
                attributes: ['name']
            },{
                
                model: Projects,
                attributes: ['id', 'judul']
            }]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

// export const getProjectByMemberId = async (req, res) =>{
//     try {
//         const member = await Members.findAll({
//             where:{
//                 userId: req.userId
//             },
//             include:[{
//                 model: Projects,
//                 attributes: ['id', 'judul']
//             },{
//                 model: 
//             }]
//         })
//     } catch (error) {
        
//     }
// }

export const getMemberById = async (req, res) =>{
    try {
        const member = await Members.findOne({
            where:{
                id: req.params.id
            }
        })
        if(!member) return res.status(404).json({msg: "data not found"})
        let response;
        if(req.role === "admin"){
            response = await Members.findOne({
                attributes:['id'],
                where:{
                    id: member.id
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        }else{
            response = await Members.findOne({
                attributes:['id'],
                where:{
                    [Op.and]:[{id: member.id}, {userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const createMember = async (req, res) =>{
    const {userId, projectId, jabatanId } = req.body;
    try {
        await Members.create({
            userId: userId,
            projectId: projectId,
            jabatanId: jabatanId
        });
        res.status(201).json({msg: "Member created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateMember = async(req, res) =>{
    try {
        const member = await Members.findOne({
            where:{
                id: req.params.id
            }
        })
        if(!member) return res.status(404).json({msg: "data not found"})
        const {userId, projectId, jabatanId } = req.body;
        if(req.role === "admin"){
            await Members.update({userId, projectId, jabatanId}, {
                where:{
                    id: member.id
                }
            })
        }else{
            return res.status(500).json({msg: "You dont have a permission"})
        }
        res.status(200).json({msg: "Member updated"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const deleteMember = (req, res) =>{
    
}