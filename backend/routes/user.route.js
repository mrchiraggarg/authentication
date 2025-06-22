import { Router } from "express";
import { CreateUser, LoginUser, GetAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.post('/CreateUser', CreateUser);
router.post('/LoginUser', LoginUser);
router.post('/GetAllUsers', GetAllUsers);

export default router;