import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import { loginUserValidationSchema } from "./auth.validation";
import { loginUserController } from "./auth.controller";

const router = express.Router();

router.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  loginUserController.loginUser
);

export const loginUserRoute = router;
