/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "./Course.model";
import { TCourse } from "./Course.interface";
import calculateDurationInWeeks from "./Course.constant";

const createCourseIntoDb = async (payload: TCourse) => {
  const durationInWeeks = calculateDurationInWeeks(
    payload.startDate,
    payload.endDate
  );
  const courseData = {
    ...payload,
    durationInWeeks,
  };
  const result = await Course.create(courseData);
  return result;
};

export const CourseService = {
  createCourseIntoDb,
};
