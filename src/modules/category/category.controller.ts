import catchAsync from "../../app/utils/catchAsync";
import sentResponse from "../../app/utils/sendResponse";
import status from "http-status";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryIntoDb(req.body);
  sentResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Category created successfuly",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategoryFromDb();
  sentResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Category retrived successfuly",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
};
