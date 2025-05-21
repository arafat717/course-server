import AppError from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import status from "http-status";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import config from "../../app/config";

const loginUser = async (payload: TLoginUser) => {
  console.log(payload);

  //   checking if the use is not exists
  const isUserExists = await User.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  // check if the password not matched
  if (!(await bcrypt.compare(payload?.password, isUserExists?.password))) {
    throw new AppError(status.FORBIDDEN, "Password do not matched!");
  }

  // create accesstoken

  const accessPayload = {
    userId: isUserExists._id,
    role: isUserExists.role,
    email: isUserExists.email,
  };

  const accesstoken = createToken(
    accessPayload,
    config.access_token as string,
    config.ACCESS_SCERET_EXPIREIN as string
  );

  const user = {
    _id: isUserExists._id,
    username: isUserExists.username,
    email: isUserExists.email,
    role: isUserExists.role,
  };

  return {
    user,
    accesstoken,
  };
};

export const loginUserService = {
  loginUser,
};
