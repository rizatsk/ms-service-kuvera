import { Router } from 'express';
import ControlerGetAntamPrice from './controller/getAntamPrice';
import ControlerGetIhsgPrice from './controller/getIhsgPrice';

const router = Router();

router.get('/price-gold-antam', ControlerGetAntamPrice);
router.get('/price-ihsg', ControlerGetIhsgPrice);

export default router;