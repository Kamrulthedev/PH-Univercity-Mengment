"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandelar_1 = __importDefault(require("./app/milddlerwer/globalErrorHandelar"));
const notFound_1 = __importDefault(require("./app/milddlerwer/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    const a = 19;
    res.send(a);
});
app.use(globalErrorHandelar_1.default);
app.use(notFound_1.default);
exports.default = app;
