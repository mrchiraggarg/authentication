import { Router } from "express";
import { CreateUser } from "../controllers/user.controller";

const router = Router();

router.post('/CreateUser', CreateUser);

export default router;