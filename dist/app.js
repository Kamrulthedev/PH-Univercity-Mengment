"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/milddlerwer/notFound"));
const globalErrorHandelar_1 = __importDefault(require("./app/milddlerwer/globalErrorHandelar"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['http://localhost:5173'] }));
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// Application routes
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    const result = 'Hello My PH University!!!';
    res.send(result);
});
// Global error handler
app.use(globalErrorHandelar_1.default);
// Not found handler
app.use(notFound_1.default);
exports.default = app;
