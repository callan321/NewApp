import { Router } from "express";
import { loginUser, registerUser } from "./controllers/authController";
import { loginLimiter, registerLimiter } from "./middleware/rateLimiters";
import { registerSchema } from "./models/userModel";
import { validateBody } from "./utils/validateBody";

export const router = Router();

// Auth routes
router.post('/register', registerLimiter, validateBody(registerSchema), registerUser);
router.post('/login', loginLimiter, loginUser);
