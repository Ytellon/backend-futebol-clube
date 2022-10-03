import { Router } from 'express';
import TeamController from '../controller/TeamsController';

const teamController = new TeamController();

const router = Router();

router.get('/', teamController.getTeams);

export default router;
