"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isID = exports.isBook = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const util_1 = require("@app/data/util");
exports.isBook = joi_1.default.object({
    title: util_1.JoiValidator.validateString().required(),
    img_url: util_1.JoiValidator.validateString().required(),
    copies: util_1.JoiValidator.validateNumber()
});
exports.isID = joi_1.default.object({
    id: util_1.JoiValidator.validateID()
});
//# sourceMappingURL=book.validator.js.map