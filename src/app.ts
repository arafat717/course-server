import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { CourseRoute } from "./modules/Course/Course.route";

app.use(express.json());
app.use(cors());

// application route
app.use("/api/v1/course", CourseRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

export default app;
