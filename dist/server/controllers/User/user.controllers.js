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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTaskController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const util_1 = require("@app/data/util");
const util_2 = require("@app/data/util");
const user_validator_1 = require("./user.validator");
const user_1 = require("@app/server/services/user");
let UserTaskController = class UserTaskController extends util_1.BaseController {
    async createUser(req, res, body) {
        try {
            const user = await user_1.UserSer.createUser(body);
            this.handleSuccess(req, res, user);
        }
        catch (error) {
            this.handleError(req, res, error);
        }
    }
    async login(req, res, body) {
        try {
            const claim = await user_1.UserSer.loginUser(body.email_address, body.password, req);
            this.handleSuccess(req, res, claim);
        }
        catch (error) {
            this.handleError(req, res, error);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpPost("/", util_2.validate(user_validator_1.isUser)),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserTaskController.prototype, "createUser", null);
__decorate([
    inversify_express_utils_1.httpPost("/login", util_2.validate(user_validator_1.isUser)),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserTaskController.prototype, "login", null);
UserTaskController = __decorate([
    inversify_express_utils_1.controller("/user")
], UserTaskController);
exports.UserTaskController = UserTaskController;
//# sourceMappingURL=user.controllers.js.map