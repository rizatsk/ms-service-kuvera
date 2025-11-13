import { Router } from 'express';
import ControllerAuthGoogle from './controller/authGoogle';
import ControllerLogout from './controller/logout';
import ControllerRefreshToken from './controller/refreshToken';

const router = Router();

router.post('/google', ControllerAuthGoogle);
router.patch('/refresh-token', ControllerRefreshToken);
router.delete('/logout', ControllerLogout)

export default router;