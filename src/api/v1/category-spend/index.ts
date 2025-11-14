import { Router } from 'express';
import verifyToken from '../../../middleware/verify-token';
import ControllerAddCategorySpend from './controller/addCategorySpend';
import { addSpendCategoryValidation, changeStatuspendCategoryValidation } from '../../../validation/spend-category';
import ControllerChangeStatusCategorySpend from './controller/changeStatusCategorySpend';

const router = Router();

router.use(verifyToken);
router.post('/', addSpendCategoryValidation, ControllerAddCategorySpend);
router.patch('/status', changeStatuspendCategoryValidation, ControllerChangeStatusCategorySpend);

export default router;