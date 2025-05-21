import status from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sentResponse from "../../app/utils/sendResponse";
import { loginUserService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserService.loginUser(req.body);
  sentResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User login successfully",
    data: result,
  });
});

export const loginUserController = {
  loginUser,
};
