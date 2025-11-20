import { Router } from 'express';
import verifyToken from '../../../middleware/verify-token';
import ControllerAddTransaction from './controller/add-transaction';
import { addTransactionValidation, editTransactionValidation } from '../../../validation/transaction';
import ControllerEditTransaction from './controller/edit-transaction';
import ControllerDeleteTransaction from './controller/delete-transaction';
import { ControllerGetTransactionByCategory } from './controller/get-transaction';

const router = Router();

router.use(verifyToken);
router.post('/', addTransactionValidation, ControllerAddTransaction);
router.patch('/', editTransactionValidation, ControllerEditTransaction);
router.delete('/:id_transaction', ControllerDeleteTransaction);
router.get('/group-by-category', ControllerGetTransactionByCategory);

export default router;