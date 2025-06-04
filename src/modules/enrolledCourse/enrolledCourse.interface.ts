import { Types } from "mongoose";

export type TEnrolledCourse = {
  course: Types.ObjectId;
  user: Types.ObjectId;
};
