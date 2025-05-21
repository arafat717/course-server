/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import status from "http-status";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import config from "../../app/config";
import { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
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

  const token = createToken(
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
    token,
  };
};

const changePasswordIntoDb = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string }
) => {
  const userExists = await User.findById(userData?.userId);
  if (!userExists) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  //checking if the password is correct
  if (
    !(await User.isPasswordMatched(
      payload?.currentPassword,
      userExists?.password
    ))
  ) {
    throw new AppError(status.FORBIDDEN, "Password do not matched!");
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_rount)
  );

  const result = await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    },
    {
      new: true,
    }
  ).lean();

  if (result) {
    delete (result as any).password;
    delete (result as any).__v;
  }

  return result;
};

export const loginUserService = {
  loginUser,
  changePasswordIntoDb,
};
