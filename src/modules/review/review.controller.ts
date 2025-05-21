import catchAsync from "../../app/utils/catchAsync";
import sentResponse from "../../app/utils/sendResponse";
import status from "http-status";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewService.createReviewIntoDb(req.user, req.body);
  sentResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Review created successfuly",
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
