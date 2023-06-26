import express from "express";
import {
    getSection,
    getSectionById,
    createSection,
    deleteSection,
    updateSection,
    getSectionByProjectId,
} from "../controllers/Section.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/section', verifyUser, getSection)
router.get('/section/:id', verifyUser, getSectionById)
router.get('/board/:id', verifyUser, getSectionByProjectId)
router.post('/section', verifyUser, createSection)
router.patch('/section/:id', verifyUser, updateSection)
router.delete('/section/:id', verifyUser, deleteSection)

export default router;