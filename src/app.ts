import cors from "cors";
import express, { Application, Request, Response } from "express";
const app: Application = express();

app.use(express.json());
app.use(cors());


const getRouter =  (req: Request, res: Response) => {
  const a = 19;
  res.send(a);
}


app.get("/", getRouter);

export default app;
