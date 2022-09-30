import { Router } from 'express';
import UserController from '../controller/UserController';
import validateLogin from '../middleware/validateLogin';

const router = Router();

const userController = new UserController();

router.post('/', validateLogin, userController.login);

export default router;
