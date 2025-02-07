"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
(0, db_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app_1.default.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
