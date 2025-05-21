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

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  console.log(req.user);
  const result = await loginUserService.changePasswordIntoDb(
    req.user,
    passwordData
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password changed successfulls",
    data: result,
  });
});

export const loginUserController = {
  loginUser,
  changePassword,
};
