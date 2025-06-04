import express from "express";
import { enrolledCourseValidation } from "./enrolledCourse.validation";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../app/middlwares/validateRequest";
import auth from "../../app/middlwares/auth";
import { enrolledCourseController } from "./enrolledCourse.controller";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth(USER_ROLE.user),
  validateRequest(
    enrolledCourseValidation.createEnrolledCourseValidationZodSchema
  ),
  enrolledCourseController.updateCourse
);

export const enrolledCourseRoute = router;
