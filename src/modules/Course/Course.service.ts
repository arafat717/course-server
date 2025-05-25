/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course } from "./Course.model";
import { TCourse } from "./Course.interface";
import calculateDurationInWeeks, { searchableFields } from "./Course.constant";
import QueryBuilder from "../../app/builder/QueryBuilder";
import mongoose from "mongoose";
import AppError from "../../app/errors/AppError";
import { Review } from "../review/review.model";
import { JwtPayload } from "jsonwebtoken";

const createCourseIntoDb = async (user: JwtPayload, payload: TCourse) => {
  const durationInWeeks = calculateDurationInWeeks(
    payload.startDate,
    payload.endDate
  );
  const createdBy = user.userId;

  const courseData = {
    ...payload,
    durationInWeeks,
    createdBy,
  };
  const result = await Course.create(courseData);
  return result;
};

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("categoryId").populate("createdBy"),
    query
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await courseQuery.countTotal();
  const result = await courseQuery.modelQuery;
  return { meta, result };
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id)
    .populate("categoryId")
    .populate("createdBy");
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

    const result = await Course.findById(id)
      .populate("createdBy")
      .populate("categoryId");

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const getCourseByIdWithReviewsFromDb = async (courseId: string) => {
  if (!courseId) {
    throw new AppError(404, "Course id not found");
  }

  const course = await Course.findById(courseId)
    .populate("categoryId")
    .populate("createdBy");
  if (!course) {
    throw new AppError(404, "Course not found");
  }

  const review = await Review.find({ courseId }).populate("createdBy");

  return {
    course,
    review,
  };
};

const getBestCourseFromDb = async () => {
  const topCourseStat = await Review.aggregate([
    {
      $group: {
        _id: "$courseId",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
    { $sort: { averageRating: -1 } },
    { $limit: 10 },
  ]);

  if (!topCourseStat.length) return null;

  const { _id: courseId, averageRating, reviewCount } = topCourseStat[0];
  const averageRatingInTwoDeg = averageRating.toFixed(2);

  const course = await Course.findById(courseId)
    .populate("categoryId")
    .populate("createdBy");

  if (!course) return null;

  return {
    course,
    averageRatingInTwoDeg,
    reviewCount,
  };
};

export const CourseService = {
  createCourseIntoDb,
  getAllCourseFromDb,
  updateCourseIntoDb,
  getSingleCourseFromDb,
  getCourseByIdWithReviewsFromDb,
  getBestCourseFromDb,
};
