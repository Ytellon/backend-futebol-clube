import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const router = Router();
const leaderBoardController = new LeaderBoardController();

router.get('/home', leaderBoardController.getLeaderBoardHome);

router.get('/away', leaderBoardController.getLeaderBoardAway);

export default router;
