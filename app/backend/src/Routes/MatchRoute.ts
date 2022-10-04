import { Router } from 'express';
import MatchController from '../controller/MatchesController';
import validateToken from '../middleware/validateToken';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getMatches);

router.post('/', validateToken, matchController.createMatch);

router.patch('/:id/finish', validateToken, matchController.updateMatch);

export default router;
