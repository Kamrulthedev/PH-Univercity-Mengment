import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import notFound from './app/milddlerwer/notFound';
import GlobalErrorHandel from './app/milddlerwer/globalErrorHandelar';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    const result = 'Hello !!!';
    res.send(result);
});

// Global error handler
app.use(GlobalErrorHandel);

// Not found handler
app.use(notFound);

export default app;