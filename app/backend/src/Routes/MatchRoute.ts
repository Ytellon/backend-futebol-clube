import { Router } from 'express';
import MatchController from '../controller/MatchesController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getMatches);

export default router;
