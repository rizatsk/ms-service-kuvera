import { Router } from "express";
import verifyToken from "../../../middleware/verify-token";
import ControllerUpdateUserByAccountId from "./controller/updateUserByAccountId";
import { updateUserByAccountIdValidation } from "../../../validation/account";
import multer from "multer";

const router = Router();

router.use(verifyToken);
router.patch('/user', multer().single('photo_profile'), updateUserByAccountIdValidation, ControllerUpdateUserByAccountId);

export default router;