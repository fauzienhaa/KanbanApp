import express from "express";
import {
    getProjectById,
    getProjects,
    createProject,
    updateProject,
    deleteProject
} from "../controllers/Projects.js"
import { verifyUser } from "../middleware/AuthUser.js";
import { isMember } from "../middleware/IsMember.js";

const router = express.Router();

router.get('/user/projects', isMember, verifyUser, getProjects)
router.get('/user/projects/:id', isMember, verifyUser, getProjectById)
router.post('/user/projects', isMember, verifyUser, createProject)
router.patch('/user/projects/:id', isMember, verifyUser, updateProject)
router.delete('/user/projects/:id', isMember, verifyUser, deleteProject)

export default router;