import { Schema, model } from "mongoose";
import { ITag, TCourse } from "./Course.interface";

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { _id: false }
);

const CourseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true },
  instructor: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  tags: [TagSchema],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  durationInWeeks: { type: Number, required: true },
  details: {
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    description: { type: String, required: true },
  },
});

export const Course = model<TCourse>("Course", CourseSchema);
