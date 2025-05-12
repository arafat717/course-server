import { Types } from "mongoose";

export interface ITag {
  name: string;
  isDeleted: boolean;
}

export interface IDetails {
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
}

export interface TCourse {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: ITag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: IDetails;
}
