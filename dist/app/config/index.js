"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    prot: process.env.USER_PROT,
    database_url: process.env.DATABASE_URL,
    data_salt_rounds: process.env.DATA_SALT_ROUNDS,
    default_password: process.env.DEPFULT_PASS
};
