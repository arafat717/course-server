import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import { CourseValidations } from "./Course.validation";
import { CourseController } from "./Course.controller";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse
);
router.get("/", CourseController.getAllCourse);
router.patch(
  "/:courseId",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse
);

export const CourseRoute = router;
