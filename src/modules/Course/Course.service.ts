/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "./Course.model";
import { TCourse } from "./Course.interface";
import calculateDurationInWeeks, { searchableFields } from "./Course.constant";
import QueryBuilder from "../../app/builder/QueryBuilder";

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

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

export const CourseService = {
  createCourseIntoDb,
  getAllCourseFromDb,
};
