import { Router } from "express";
import { CreateUser, LoginUser, GetAllUsers, DeleteUser, GetUserById, UpdateUserById } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes (no authentication required)
router.post('/CreateUser', CreateUser);
router.post('/LoginUser', LoginUser);

// Protected routes (authentication required)
router.get('/GetAllUsers', authenticateToken, GetAllUsers);
router.get('/GetUserById/:id', authenticateToken, GetUserById);
router.put('/UpdateUserById/:id', authenticateToken, UpdateUserById);
router.delete('/DeleteUser', authenticateToken, DeleteUser);

export default router;