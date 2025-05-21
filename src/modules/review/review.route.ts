import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import { ReviewValidations } from "./review.validation";
import { ReviewController } from "./review.controller";
import auth from "../../app/middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-review",
  auth(USER_ROLE.user),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewController.createReview
);

export const ReviewRoute = router;
