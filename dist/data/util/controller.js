"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = exports.Controller = void 0;
const util_1 = require("@app/data/util");
const inversify_1 = require("inversify");
const pick_1 = __importDefault(require("lodash/pick"));
const Logger = require("bunyan");
const log_1 = require("../../common/services/log");
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("./response");
const error_1 = require("./error");
let Controller = class Controller {
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * Handles operation success and sends a HTTP response.
     * __Note__: if the data passed is a promise, no value is sent
     * until the promise resolves.
     * @param req Express request
     * @param res Express response
     * @param result Success data
     */
    async handleSuccess(req, res, result) {
        res.json({
            status: "success",
            data: result
        });
        this.logger.info({ req, res });
    }
    /*
     * Determines the HTTP status code of an error
     * @param err Error object
     */
    getHTTPErrorCode(err) {
        // check if error code exists and is a valid HTTP code.
        if (err.code >= 100 && err.code < 600) {
            if (err instanceof util_1.ModelNotFoundError)
                return http_status_codes_1.StatusCodes.NOT_FOUND;
            if (err instanceof util_1.DuplicateModelError)
                return http_status_codes_1.StatusCodes.CONFLICT;
            if (err instanceof util_1.InvalidSessionError)
                return http_status_codes_1.StatusCodes.UNAUTHORIZED;
            if (err instanceof error_1.UnAuthorisedError)
                return http_status_codes_1.StatusCodes.UNAUTHORIZED;
            if (err instanceof error_1.ForbiddenError)
                return http_status_codes_1.StatusCodes.FORBIDDEN;
            return err.code;
        }
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    /**
     * Handles operation error, sends a HTTP response and logs the error.
     * @param req Express request
     * @param res Express response
     * @param error Error object
     * @param message Optional error message. Useful for hiding internal errors from clients.
     */
    handleError(req, res, err, message) {
        var _a;
        /**
         * Useful when we call an asynchrous function that might throw
         * after we've sent a response to client
         */
        if (res.headersSent)
            return log_1.Log.error(err);
        const { code } = err;
        const errorMessage = message || err.message;
        response_1.responseHandler(res, (_a = this.getHTTPErrorCode(err)) !== null && _a !== void 0 ? _a : code, errorMessage, null);
        log_1.Log.error(req, res, err);
    }
    /**
     * Picks relevant pagination options from an Express query object
     * @param query Express Query object
     */
    getPaginationOptions(query) {
        return pick_1.default(query, ["page", "per_page", "projections", "sort"]);
    }
};
Controller = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [Logger])
], Controller);
exports.Controller = Controller;
class BaseController extends Controller {
    constructor() {
        super(log_1.Log);
    }
    log(req, action) {
        return util_1.Audits.log(req, action);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=controller.js.map