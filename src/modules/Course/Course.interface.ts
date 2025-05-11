export interface ICourse {
  _id: string; // MongoDB ObjectId as string
  title: string;
  instructor: string;
  categoryId: string; // Reference to Category collection (ObjectId as string)
  price: number;
  tags: {
    name: string;
    isDeleted: boolean;
  }[];
  startDate: string; // ISO date string format (e.g., "2025-05-11")
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: {
    level: "Beginner" | "Intermediate" | "Advanced";
    description: string;
  };
}
