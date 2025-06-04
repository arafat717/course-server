/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../app/errors/AppError";
import { sentImageToCloudinary } from "../../app/utils/sentImageToCloudinary";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import https from "http-status";

const createUserIntoDb = async (file: any, payload: TUser) => {
  if (file) {
    const imageName = `${payload.role}${payload?.username}`;
    const path = file?.path;

    // sent image to cloudinary
    const image = await sentImageToCloudinary(imageName, path);
    payload.profileImage = image.secure_url;
  }
  const result = await User.create(payload);
  return result;
};

const makeAdminIntoDb = async (payload: Partial<TUser>) => {
  const isUserExists = await User.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new AppError(https.NOT_FOUND, "This user not found");
  }

  const result = await User.findOneAndUpdate(
    { email: payload.email },
    {
      role: "admin",
    }
  );
  return result;
};

export const UserService = {
  createUserIntoDb,
  makeAdminIntoDb,
};
