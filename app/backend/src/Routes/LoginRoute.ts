import { Router } from 'express';
import UserController from '../controller/UserController';
import validateLogin from '../middleware/validateLogin';
import validateToken from '../middleware/validateToken';

const router = Router();

const userController = new UserController();

router.post('/', validateLogin, userController.login);
router.get('/validate', validateToken, userController.loginValidate);

export default router;
