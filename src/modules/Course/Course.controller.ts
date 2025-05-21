import catchAsync from "../../app/utils/catchAsync";
import sentResponse from "../../app/utils/sendResponse";
import status from "http-status";
import { CourseService } from "./Course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDb(req.user, req.body);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course created successfuly",
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCourseFromDb(req.query);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course retrive successfuly",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseService.getSingleCourseFromDb(courseId);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course retrive successfuly",
    data: result,
  });
});

const getSingleCourseWhitReviews = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseService.getCourseByIdWithReviewsFromDb(courseId);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course with reviews retrived successfuly",
    data: result,
  });
});

const getBestCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getBestCourseFromDb();
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Best Course retrived successfuly",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseService.updateCourseIntoDb(courseId, req.body);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course is updated successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  updateCourse,
  getSingleCourse,
  getSingleCourseWhitReviews,
  getBestCourse,
};
