import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { CourseRoute } from "./modules/Course/Course.route";
import { CategoryRoute } from "./modules/category/category.route";
import { ReviewRoute } from "./modules/review/review.route";
import globalErrorHandler from "./app/middlwares/globalErrorHandler";
import notFound from "./app/middlwares/notFound";

app.use(express.json());
app.use(cors());

// application route
app.use("/api/v1/course", CourseRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/review", ReviewRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
