"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const dbConfig_1 = require("./infrastruture/database/dbConfig");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const startServer = async () => {
    try {
        await (0, dbConfig_1.connectDB)();
        const app = (0, express_1.default)();
        app.use((0, morgan_1.default)("dev"));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        // CORS configuration
        app.use((0, cors_1.default)({
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        }));
        // User routes
        app.use('/api/users', userRoute_1.default);
        // 500 - Internal Server Error handler
        app.use((err, req, res, next) => {
            console.error("Error:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err.message,
            });
        });
        // Start the server
        app.listen(3000, () => {
            console.log(`Server active on port: ${3000}`);
        });
    }
    catch (error) {
        console.error("Error starting the server:", error);
    }
};
startServer();
//# sourceMappingURL=index.js.map