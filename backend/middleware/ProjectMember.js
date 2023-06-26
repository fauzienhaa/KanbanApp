import Members from "../models/MembersModel.js";
import Projects from "../models/ProjectsModel.js";

export const isMember = async (req, res, next) =>{
    const member = await Members.findAll({
        where: {
            userId: req.session.userId
        }
    });
    if(!member) return res.status(404).json({msg: "You don't have any project"})
    req.jabatanId = member.jabatanId;
    req.projectId = member.projectId;
    next();
}

export const ownerOnly = async (req, res, next) =>{
    const member = await Members.findAll({
        where: {
            userId: req.session.userId
        }
    });
    if(!member) return res.status(404).json({msg: "You don't have any project"})
    if(member.jabatanId !== "Owner") return res.status(403).json({msg: 'You have no access'})
    next();
}