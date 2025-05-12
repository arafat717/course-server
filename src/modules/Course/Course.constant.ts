const calculateDurationInWeeks = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid startDate or endDate");
  }

  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return Math.ceil(diffInDays / 7);
};

export const searchableFields = [
  "title",
  "price",
  "startDate",
  "endDate",
  "language",
  "durationInWeeks",
];

export default calculateDurationInWeeks;
