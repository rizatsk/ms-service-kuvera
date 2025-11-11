import { Router } from 'express';
import { ControllerAuthGoogle } from './controller/authGoogle';

const router = Router();

router.post('/google', ControllerAuthGoogle);

export default router;