import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const router = Router();
const leaderBoardController = new LeaderBoardController();

router.get('/home', leaderBoardController.getLeaderBoard);

export default router;
