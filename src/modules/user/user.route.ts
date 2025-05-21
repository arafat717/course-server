import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import { userValidationSchema } from "./user.validation";
import { UserController } from "./user.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchema),
  UserController.createUser
);

export const UserRoute = router;
