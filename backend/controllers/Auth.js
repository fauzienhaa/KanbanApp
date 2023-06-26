import Users from "../models/UsersModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: 'User not found!'})
    const match = await argon2.verify(user.password, req.body.password)
    if(!match) return res.status(400).json({msg: "Incorrect email or password!"});
    req.session.userId = user.id;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    // const userId = user.id
    res.status(200).json({uuid, name, email, role});
}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Please login to your account first."})
    }
    const user = await Users.findOne({
        attributes:['uuid', 'name', 'email', 'role'],
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: 'User not found!'})
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Can't logout"})
        res.status(200).json({msg: "Anda telah logout"})
    })
}