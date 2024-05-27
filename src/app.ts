import cors from "cors";
import express, { Application, Request, Response } from "express";
import { StudentRouts } from "./app/modules/student/student.route";
import { UserRouotes } from "./app/modules/users/user.routes";
import GlobalErrorHandel from "./app/milddlerwer/globalErrorHandelar";
import notFound from "./app/milddlerwer/notFound";
import router from "./app/routes";
import bodyParser from 'body-parser';
const app: Application = express();

app.use(express.json());
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//application routes
app.use("/api/v1" , router);


app.get("/", (req: Request, res: Response) => {
  const a = 19;
  res.send(a);
});

app.use(GlobalErrorHandel);
app.use(notFound)

export default app;
