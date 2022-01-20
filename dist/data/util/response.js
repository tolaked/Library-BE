"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
/**
 *  Send response message
 *
 * @param {object} res - response object
 * @param {number} status - http status code
 * @param {string} statusMessage - http status message
 * @param {object} data - response data
 *
 * @returns {object} returns response
 *
 */
exports.responseHandler = (res, code, statusMessage, data) => res.status(code).json({
    data,
    code,
    message: statusMessage
});
//# sourceMappingURL=response.js.map