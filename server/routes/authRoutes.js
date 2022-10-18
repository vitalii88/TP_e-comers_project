import { Router } from 'express';
import { authController } from '../controllers/index.js'

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;
