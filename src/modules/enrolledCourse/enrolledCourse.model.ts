import { model, Schema } from "mongoose";
import { TEnrolledCourse } from "./enrolledCourse.interface";

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EnrolledCourse = model<TEnrolledCourse>(
  "EnrolledCourse",
  enrolledCourseSchema
);
