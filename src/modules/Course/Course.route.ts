import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import { CourseValidations } from "./Course.validation";
import { CourseController } from "./Course.controller";
import auth from "../../app/middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse
);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  CourseController.getAllCourse
);
router.get(
  "/best",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  CourseController.getBestCourse
);
router.get(
  "/:courseId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  CourseController.getSingleCourse
);
router.get(
  "/:courseId/reviews",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  CourseController.getSingleCourseWhitReviews
);
router.patch(
  "/:courseId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse
);

export const CourseRoute = router;
