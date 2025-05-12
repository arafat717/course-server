/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "./Course.model";
import { TCourse } from "./Course.interface";
import calculateDurationInWeeks, { searchableFields } from "./Course.constant";
import QueryBuilder from "../../app/builder/QueryBuilder";
import mongoose from "mongoose";

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
const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { tags, ...remaining } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updateBasic = await Course.findByIdAndUpdate(id, remaining, {
      upsert: true,
    });

    if (tags && tags.length > 0) {
      const deleteTags = tags.filter((el) => el.isDeleted).map((el) => el.name);
      const deletetagsfronlist = await Course.findByIdAndUpdate(id, {
        $pull: {
          tags: { name: { $in: deleteTags } },
        },
      });

      const newTags = tags.filter((el) => el.name && !el.isDeleted);
      const newTagslist = await Course.findByIdAndUpdate(id, {
        $addToSet: { tags: { $each: newTags } },
      });
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const CourseService = {
  createCourseIntoDb,
  getAllCourseFromDb,
  updateCourseIntoDb,
  getSingleCourseFromDb,
};
