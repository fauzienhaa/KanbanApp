import express from "express";
import {
    getJabatan,
    getJabatanById,
    createJabatan,
    updateJabatan,
    deleteJabatan
} from "../controllers/Jabatan.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/jabatan', verifyUser, getJabatan)
router.get('/jabatan/:id', verifyUser, getJabatanById)
router.post('/jabatan', verifyUser, createJabatan)
router.patch('/jabatan/:id', verifyUser, updateJabatan)
router.delete('/jabatan/:id', verifyUser, deleteJabatan)

export default router;