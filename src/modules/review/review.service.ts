/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import { Course } from "../Course/Course.model";
import AppError from "../../app/errors/AppError";
import status from "http-status";

const createReviewIntoDb = async (userData: JwtPayload, payload: TReview) => {
  const courseIdExisits = await Course.findById(payload.courseId);
  if (!courseIdExisits) {
    throw new AppError(status.NOT_FOUND, "This course not exits");
  }
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
