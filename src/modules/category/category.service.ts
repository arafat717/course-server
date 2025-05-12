/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDb = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDb = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryService = {
  createCategoryIntoDb,
  getAllCategoryFromDb,
};
