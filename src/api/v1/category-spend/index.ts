import { Router } from 'express';
import verifyToken from '../../../middleware/verify-token';
import ControllerAddCategorySpend from './controller/addCategorySpend';
import { addSpendCategoryValidation } from '../../../validation/spend-category';

const router = Router();

router.use(verifyToken)
router.post('/', addSpendCategoryValidation, ControllerAddCategorySpend)

export default router;