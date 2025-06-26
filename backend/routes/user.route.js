import { Router } from "express";
import { CreateUser, LoginUser, GetAllUsers, DeleteUser, GetUserById, UpdateUserById } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/CreateUser', CreateUser);
router.post('/LoginUser', LoginUser);
router.post('/GetAllUsers', authenticateToken, GetAllUsers);
router.post('/GetUserById/:id', authenticateToken, GetUserById);
router.post('/UpdateUserById/:id', authenticateToken, UpdateUserById);
router.post('/DeleteUser', authenticateToken, DeleteUser);

export default router;