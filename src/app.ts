import cors from "cors";
import express, { Application, Request, Response } from "express";
import { StudentRouts } from "./app/modules/student/student.route";
const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/students', StudentRouts)


app.get("/",(req: Request, res: Response) => {
  const a = 19;
  res.send(a);
});

export default app;
