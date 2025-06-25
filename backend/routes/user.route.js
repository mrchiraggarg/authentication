import { Router } from "express";
import { CreateUser, LoginUser, GetAllUsers, DeleteUser } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/CreateUser', authenticateToken, CreateUser);
router.post('/LoginUser', authenticateToken, LoginUser);
router.post('/GetAllUsers', authenticateToken, GetAllUsers);
router.post('/DeleteUser', authenticateToken, DeleteUser);

export default router;