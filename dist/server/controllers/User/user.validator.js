"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const util_1 = require("@app/data/util");
exports.isUser = joi_1.default.object({
    password: util_1.JoiValidator.validateString().required(),
    email_address: util_1.JoiValidator.validateString().required(),
});
//# sourceMappingURL=user.validator.js.map