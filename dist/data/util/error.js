"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.NoAuthenticationError = exports.InvalidSessionError = exports.UnAuthorisedError = exports.ConflictError = exports.ConstraintDataError = exports.ConstraintError = exports.NotFoundError = exports.GatewayTimeoutError = exports.BadGatewayError = exports.BadRequestError = exports.ForbiddenError = exports.ServerError = exports.ModelNotFoundError = exports.DuplicateModelError = exports.ControllerError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
/**
 * Base error type for errors that the server can respond
 * with.
 */
class ControllerError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ControllerError = ControllerError;
class DuplicateModelError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.BAD_REQUEST;
    }
}
exports.DuplicateModelError = DuplicateModelError;
class ModelNotFoundError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.NOT_FOUND;
    }
}
exports.ModelNotFoundError = ModelNotFoundError;
class ServerError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    }
}
exports.ServerError = ServerError;
class ForbiddenError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.FORBIDDEN;
    }
}
exports.ForbiddenError = ForbiddenError;
class BadRequestError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.BAD_REQUEST;
    }
}
exports.BadRequestError = BadRequestError;
class BadGatewayError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.BAD_GATEWAY;
    }
}
exports.BadGatewayError = BadGatewayError;
class GatewayTimeoutError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.GATEWAY_TIMEOUT;
    }
}
exports.GatewayTimeoutError = GatewayTimeoutError;
class NotFoundError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.NOT_FOUND;
    }
}
exports.NotFoundError = NotFoundError;
class ConstraintError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.UNPROCESSABLE_ENTITY;
    }
}
exports.ConstraintError = ConstraintError;
class ConstraintDataError extends ControllerError {
    constructor(message, data) {
        super(message);
        this.code = http_status_codes_1.default.UNPROCESSABLE_ENTITY;
        this.data = data;
    }
}
exports.ConstraintDataError = ConstraintDataError;
class ConflictError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.CONFLICT;
    }
}
exports.ConflictError = ConflictError;
class UnAuthorisedError extends ControllerError {
    constructor(message) {
        super(message);
        this.code = http_status_codes_1.default.UNAUTHORIZED;
    }
}
exports.UnAuthorisedError = UnAuthorisedError;
class InvalidSessionError extends Error {
    constructor(originalError) {
        super("Your session is invalid");
        this.originalError = originalError;
    }
}
exports.InvalidSessionError = InvalidSessionError;
class NoAuthenticationError extends Error {
    constructor() {
        super("There's no session associated with this request");
    }
}
exports.NoAuthenticationError = NoAuthenticationError;
exports.handleError = (req, res, error, code) => {
    res.json({
        code,
        error
    });
};
//# sourceMappingURL=error.js.map