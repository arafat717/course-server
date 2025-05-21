/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { JwtPayload } from "jsonwebtoken";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDb = async (
  userData: JwtPayload,
  payload: TCategory
) => {
  const unfo = {
    ...payload,
    createdBy: userData.userId,
  };
  const result = await Category.create(unfo);
  return result;
};

const getAllCategoryFromDb = async () => {
  const result = await Category.find().populate("createdBy");
  return result;
};

export const CategoryService = {
  createCategoryIntoDb,
  getAllCategoryFromDb,
};
