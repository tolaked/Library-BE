"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secure = exports.unseal = exports.seal = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("@app/data/user");
const util_1 = require("@app/data/util");
dotenv_1.default.config();
/**
 * Used to create a token that can be passed to Iris
 * @param data the payload to be encrypted
 * @param secret Non-random secret key to be used for encrypting and decrypting the token
 * @param ttl Lifetime of the token. Can accept either a number which is accepted as the
 * time in seconds or a string value such as `1h`. For string values, the unit of
 * time is required such as `m,s etc`. Read more at `https://github.com/zeit/ms`.
 */
function seal(data, secret, ttl, req) {
    const expiresIn = typeof ttl === "number" ? `${ttl}s` : ttl;
    return new Promise((resolve, reject) => {
        const claim = data.toJSON ? data.toJSON() : data;
        jsonwebtoken_1.default.sign({ claim }, secret, { expiresIn }, (err, sig) => {
            if (err)
                return reject(err);
            resolve(sig);
        });
    });
}
exports.seal = seal;
/**
 * Used to verify a token. Note that it expects the data to be stored in the
 * `claim` property.
 * @param token This is a valid JWT that is to be decoded
 * @param secret Non-random secret key to be used for encrypting and decrypting the token
 */
function unseal(token, secret, next) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, val) => {
            if (err)
                next(new util_1.UnAuthorisedError("Unauthorised"));
            resolve(val["claim"]);
        });
    });
}
exports.unseal = unseal;
async function secure(req, res, next) {
    if (!(req === null || req === void 0 ? void 0 : req.headers.authorization)) {
        next(new util_1.UnAuthorisedError("Unauthorised"));
    }
    const claim = await unseal(req.headers.authorization, process.env.secret, next);
    const user = await user_1.UserRepo.byID(claim.id);
    if (!user) {
        next(new util_1.ForbiddenError("Invalid Token"));
    }
    req["user"] = claim;
    return next();
}
exports.secure = secure;
//# sourceMappingURL=authorization.js.map