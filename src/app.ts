import cors from "cors";
import express, { Application, Request, Response } from "express";
import { StudentRouts } from "./app/modules/student/student.route";
import { UserRouotes } from "./app/modules/users/user.routes";
import GlobalErrorHandel from "./app/milddlerwer/globalErrorHandelar";
const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1/students", StudentRouts);
app.use("/api/v1/users", UserRouotes);

app.get("/", (req: Request, res: Response) => {
  const a = 19;
  res.send(a);
});

app.use(GlobalErrorHandel);

export default app;
