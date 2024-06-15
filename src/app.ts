import cors from "cors";
import express, { Application, Request, Response } from "express";
import GlobalErrorHandel from "./app/milddlerwer/globalErrorHandelar";
import notFound from "./app/milddlerwer/notFound";
import router from "./app/routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:['http://localhost:5173']}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  const result = "Hello !!!";
  res.send(result);
});

app.use(GlobalErrorHandel);
app.use(notFound);

export default app;
