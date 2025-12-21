import { Router } from 'express';
import { ControlerGetAntamPrice, ControlerGetGoldPrice } from './controller/getGoldPrice';

const router = Router();

router.get('/price-gold-antam', ControlerGetAntamPrice);
router.get('/price-gold/:type', ControlerGetGoldPrice);

export default router;
