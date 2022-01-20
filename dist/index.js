"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("reflect-metadata");
const http_1 = __importDefault(require("http"));
const app_1 = require("./server/app");
const log_1 = require("./common/services/log");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const start = async () => {
    try {
        const app = new app_1.App();
        const appServer = app.getServer().build();
        // connect to MongoDB
        await app.connectDB();
        log_1.Log.info("📦  MongoDB Connected!");
        // start server
        const httpServer = http_1.default.createServer(appServer);
        httpServer.listen(process.env.PORT);
        httpServer.on("listening", () => log_1.Log.info(`🚀  ${process.env.service_name} listening on ` + process.env.PORT));
    }
    catch (err) {
        log_1.Log.error(err, "Fatal server error");
    }
};
start();
//# sourceMappingURL=index.js.map