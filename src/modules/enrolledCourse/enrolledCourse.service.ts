import AppError from "../../app/errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";
import status from "http-status";

const enrolledCourseIntoDb = async (user: TUser, payload: TEnrolledCourse) => {
  const userId = await User.findOne({ email: user.email });
  if (!userId) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }
  const info = { course: payload.course, user: userId._id };
  const result = await EnrolledCourse.create(info);
  return result;
};

export const enrolledCourseService = {
  enrolledCourseIntoDb,
};
