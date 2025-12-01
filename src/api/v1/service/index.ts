import { Router } from 'express';
import ControlerGetAntamPrice from './controller/getAntamPrice';

const router = Router();

router.get('/price-gold-antam', ControlerGetAntamPrice);

export default router;