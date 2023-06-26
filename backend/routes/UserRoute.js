import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.patch('/users/:uuid', verifyUser, adminOnly, updateUser)
router.delete('/users/:uuid', verifyUser, adminOnly, deleteUser)

export default router;