"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidator = exports.validate = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const error_1 = require("./error");
function validate(schema) {
    return (req, res, next) => {
        if (!schema)
            return next();
        const { body, params, query } = req;
        joi_1.default.validate(Object.assign(Object.assign(Object.assign({}, body), params), query), schema, {
            abortEarly: false,
            stripUnknown: true,
            allowUnknown: true
        })
            .then(() => next())
            .catch(err => {
            const errors = {};
            err.details.forEach(e => {
                errors[e.message.split(" ", 1)[0].replace(/['"]/g, "")] = e.message.replace(/['"]/g, "");
            });
            return res.json({
                code: error_1.ServerError,
                message: errors
            });
        });
    };
}
exports.validate = validate;
;
/** *
 *  Object that help to validate user details
 */
exports.JoiValidator = {
    validateString() {
        return joi_1.default.string();
    },
    validateEmail() {
        return joi_1.default.string().email();
    },
    validatePassword() {
        return joi_1.default.string().min(8).strict().required();
    },
    validateNumber() {
        return joi_1.default.number();
    },
    validateID() {
        return joi_1.default.string().uuid().trim().required();
    }
};
//# sourceMappingURL=validate.js.map