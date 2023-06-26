import express from "express";
import {
    getTasks,
    createTasks,
    getTasksById,
    deleteTasks,
    updateTasks
} from "../controllers/Tasks.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/tasks', verifyUser, getTasks)
router.get('/task/:id', verifyUser, getTasksById)
router.post('/tasks', verifyUser, createTasks)
router.patch('/task/:id', verifyUser, updateTasks)
router.delete('/task/:id', verifyUser, deleteTasks)

export default router;