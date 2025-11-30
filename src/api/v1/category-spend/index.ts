import { Router } from 'express';
import verifyToken from '../../../middleware/verify-token';
import ControllerAddCategorySpend from './controller/addCategorySpend';
import { addSpendCategoryValidation, changeNameSpendCategoryValidation, changeStatuspendCategoryValidation } from '../../../validation/spend-category';
import ControllerChangeStatusCategorySpend from './controller/changeStatusCategorySpend';
import ControllerEditCategorySpend from './controller/editCategorySpemd';

const router = Router();

router.use(verifyToken);
router.post('/', addSpendCategoryValidation, ControllerAddCategorySpend);
router.patch('/status', changeStatuspendCategoryValidation, ControllerChangeStatusCategorySpend); 
router.patch('/', changeNameSpendCategoryValidation, ControllerEditCategorySpend); 

export default router;