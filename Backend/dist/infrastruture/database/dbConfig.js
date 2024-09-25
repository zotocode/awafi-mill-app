"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const connect = await mongoose_1.default.connect("mongodb://localhost:27017/NewAdmin");
        console.log(`Database connected: ${connect.connection.host}`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Database connection error: ${err.message}`);
        }
        else {
            console.error(`Unknown database connection error:`, err);
        }
        process.exit(1); // Exit the process if the connection fails
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=dbConfig.js.map