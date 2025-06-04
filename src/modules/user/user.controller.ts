import status from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { UserService } from "./user.service";
import sentResponse from "../../app/utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDb(req.file, req.body);
  sentResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User registered successfully",
    data: result,
  });
});

const makeAdmin = catchAsync(async (req, res) => {
  const result = await UserService.makeAdminIntoDb(req.body);
  sentResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "This user is now admin",
    data: result,
  });
});

export const UserController = {
  createUser,
  makeAdmin,
};
