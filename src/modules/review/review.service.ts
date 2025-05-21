/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDb = async (userData: JwtPayload, payload: TReview) => {
  const info = {
    ...payload,
    createdBy: userData.userId,
  };
  const result = (await Review.create(info)).populate("createdBy");
  return result;
};

export const ReviewService = {
  createReviewIntoDb,
};
