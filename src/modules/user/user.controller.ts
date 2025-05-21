import status from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { UserService } from "./user.service";
import sentResponse from "../../app/utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDb(req.body);
  sentResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User registered successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
};
