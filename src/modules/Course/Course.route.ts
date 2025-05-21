import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import { CourseValidations } from "./Course.validation";
import { CourseController } from "./Course.controller";
import auth from "../../app/middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse
);
router.get("/", CourseController.getAllCourse);
router.get("/best", CourseController.getBestCourse);
router.get("/:courseId", CourseController.getSingleCourse);
router.get("/:courseId/reviews", CourseController.getSingleCourseWhitReviews);
router.patch(
  "/:courseId",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse
);

export const CourseRoute = router;
