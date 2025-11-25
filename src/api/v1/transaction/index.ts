import { Router } from 'express';
import verifyToken from '../../../middleware/verify-token';
import { addTransactionValidation, editTransactionValidation } from '../../../validation/transaction';
import ControllerAddTransaction from './controller/add-transaction';
import ControllerDeleteTransaction from './controller/delete-transaction';
import ControllerEditTransaction from './controller/edit-transaction';

const router = Router();

router.use(verifyToken);
router.post('/', addTransactionValidation, ControllerAddTransaction);
router.patch('/', editTransactionValidation, ControllerEditTransaction);
router.delete('/:id_transaction', ControllerDeleteTransaction);

export default router;