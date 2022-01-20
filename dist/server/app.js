"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("module-alias/register");
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const response_time_1 = __importDefault(require("response-time"));
const inversify_express_utils_1 = require("inversify-express-utils");
const mongoose_1 = __importDefault(require("mongoose"));
const ioc_1 = __importDefault(require("../common/config/ioc"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../data/database");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
class App {
    constructor() {
        this.getServer = () => this.server;
        this.server = new inversify_express_utils_1.InversifyExpressServer(ioc_1.default, null, {
            rootPath: process.env.api_version
        });
        // setup server-level middlewares
        this.server.setConfig((app) => {
            app.enabled("x-powered-by");
            app.use(response_time_1.default());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use(body_parser_1.default.json());
            // CORS
            app.use(cors_1.default());
            app.options("*", cors_1.default());
        });
        this.server.setErrorConfig((app) => {
            // expose index endpoint
            app.get("/", (_req, res) => {
                if (mongoose_1.default.connections.every(conn => conn.readyState !== 1)) {
                    return res.status(500).send("MongoDB is not ready");
                }
                res.status(200).json({
                    status: "success",
                    data: { message: "Welcome To library Service" }
                });
            });
            // register 404 route handler
            app.use((_req, res, _next) => {
                res.status(404).json({
                    status: "error",
                    data: { message: "Not Found" }
                });
            });
            // handle all error
            app.use((err, _req, res, next) => {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        data: err.message
                    });
                }
                return next();
            });
        });
    }
    printRoutes() {
        const routeInfo = inversify_express_utils_1.getRouteInfo(ioc_1.default);
        console.log(JSON.stringify(routeInfo));
    }
    async connectDB() {
        await mongoose_1.default.connect(process.env.mongodb_url, Object.assign({}, (process.env.is_production ? database_1.secureMongoOpts : database_1.defaultMongoOpts)));
        this.db = mongoose_1.default.connection;
    }
    /**
     * Closes MongoDB and Redis connection
     */
    async closeDB() {
        await mongoose_1.default.disconnect();
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map