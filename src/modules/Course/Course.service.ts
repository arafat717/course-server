/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "./Course.model";
import { TCourse } from "./Course.interface";

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

export const CourseService = {
  createCourseIntoDb,
};
