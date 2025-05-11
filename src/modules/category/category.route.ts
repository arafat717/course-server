import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import { CategoryController } from "./category.controller";
import { CategoryValidations } from "./category.validation";

const router = express.Router();

router.post(
  "/create-category",
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryController.createCategory
);

export const CategoryRoute = router;
