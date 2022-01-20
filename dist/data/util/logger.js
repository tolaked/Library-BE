"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errSerializer = exports.resSerializer = exports.createRequestSerializer = void 0;
const bunyan_1 = __importDefault(require("bunyan"));
function removeSensitiveData(body, props) {
    const allKeys = Object.keys(body);
    const permittedKeys = allKeys.filter(k => props.indexOf(k) === -1);
    return permittedKeys.reduce((payload, k) => {
        payload[k] = body[k];
        return payload;
    }, {});
}
/**
 * Create a function that serializes an Express request
 * for Bunyan logging
 * @param sensitiveProps key names of sensitive properties
 */
function createRequestSerializer(...sensitiveProps) {
    return (req) => {
        if (!req || !req.connection)
            return req;
        return Object.assign({ method: req.method, url: req.url, headers: req.headers, origin_service: req.headers["x-origin-service"], remoteAddress: req.connection.remoteAddress, remotePort: req.connection.remotePort, 
            // @ts-ignore
            id: req.id }, (req.body && Object.keys(req.body).length !== 0
            ? { body: removeSensitiveData(req.body, sensitiveProps) }
            : undefined));
    };
}
exports.createRequestSerializer = createRequestSerializer;
/**
 * Serializes an Express response for Bunyan logging
 * @param res Express response object
 */
exports.resSerializer = (res) => {
    if (!res || !res.statusCode)
        return res;
    return {
        statusCode: res.statusCode,
        // @ts-ignore
        headers: res._headers,
        // @ts-ignore
        body: res.body
    };
};
/**
 * Extends the standard bunyan error serializer and allows custom fields to be added to the error log
 */
exports.errSerializer = (err) => {
    const { url, data, req, response, config } = err;
    const bunyanSanitizedError = bunyan_1.default.stdSerializers.err(err);
    return Object.assign(Object.assign(Object.assign({}, bunyanSanitizedError), { url,
        data,
        req,
        config }), (response &&
        typeof response === "object" && {
        response: {
            config: response.config,
            data: response.data,
            status: response.status
        }
    }));
};
//# sourceMappingURL=logger.js.map