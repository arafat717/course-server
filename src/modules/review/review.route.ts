import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import { ReviewValidations } from "./review.validation";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post(
  "/create-review",
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewController.createReview
);

export const ReviewRoute = router;
