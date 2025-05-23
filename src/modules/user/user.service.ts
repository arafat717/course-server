/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUserIntoDb,
};
