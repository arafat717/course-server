import express from "express";
import validateRequest from "../../app/middlwares/validateRequest";
import { CategoryController } from "./category.controller";
import { CategoryValidations } from "./category.validation";
import auth from "../../app/middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-category",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryController.createCategory
);
router.get("/", CategoryController.getAllCategory);

export const CategoryRoute = router;
