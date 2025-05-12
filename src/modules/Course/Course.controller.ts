import catchAsync from "../../app/utils/catchAsync";
import sentResponse from "../../app/utils/sendResponse";
import status from "http-status";
import { CourseService } from "./Course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDb(req.body);
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

export const CourseController = {
  createCourse,
  getAllCourse,
};
