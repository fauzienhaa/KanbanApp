import express from "express";
import {
    getMember,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    getMemberByProjectId
} from "../controllers/Members.js"
import { verifyUser } from "../middleware/AuthUser.js";
import { ownerOnly } from "../middleware/ProjectMember.js";

const router = express.Router();

router.get('/members', verifyUser, getMember)
router.get('/pmembers/:id', verifyUser, getMemberByProjectId)
router.get('/members/:id', verifyUser, getMemberById)
router.post('/members', verifyUser, createMember)
router.patch('/members/:id', verifyUser, updateMember)
router.delete('/members/:id', verifyUser, deleteMember)

export default router;