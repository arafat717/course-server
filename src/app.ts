import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { CourseRoute } from "./modules/Course/Course.route";
import { CategoryRoute } from "./modules/category/category.route";

app.use(express.json());
app.use(cors());

// application route
app.use("/api/v1/course", CourseRoute);
app.use("/api/v1/category", CategoryRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

export default app;
