import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import {
  makeAdminValidationSchema,
  userValidationSchema,
} from "./user.validation";
import { UserController } from "./user.controller";
import { upload } from "../../app/utils/sentImageToCloudinary";
import auth from "../../app/middlwares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/register",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidationSchema),
  UserController.createUser
);

router.patch(
  "/make-admin",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(makeAdminValidationSchema),
  UserController.makeAdmin
);

export const UserRoute = router;
