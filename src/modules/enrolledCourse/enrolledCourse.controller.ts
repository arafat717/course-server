import catchAsync from "../../app/utils/catchAsync";
import sentResponse from "../../app/utils/sendResponse";
import { enrolledCourseService } from "./enrolledCourse.service";
import status from "http-status";

const updateCourse = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await enrolledCourseService.enrolledCourseIntoDb(
    user,
    req.body
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course enrolled successful",
    data: result,
  });
});

export const enrolledCourseController = {
  updateCourse,
};
