/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDb = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

export const ReviewService = {
  createReviewIntoDb,
};
