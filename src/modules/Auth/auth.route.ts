import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import {
  LoginserValidations,
  loginUserValidationSchema,
} from "./auth.validation";
import { loginUserController } from "./auth.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../app/middlwares/auth";

const router = express.Router();

router.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  loginUserController.loginUser
);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(LoginserValidations.changePasswordValidationSchema),
  loginUserController.changePassword
);

export const loginUserRoute = router;
