"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const util_1 = require("@app/data/util");
const bunyan_1 = require("bunyan");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.Log = bunyan_1.createLogger({
    name: process.env.service_name,
    serializers: {
        err: util_1.errSerializer,
        res: util_1.resSerializer,
        req: util_1.createRequestSerializer("password")
    }
});
//# sourceMappingURL=log.js.map