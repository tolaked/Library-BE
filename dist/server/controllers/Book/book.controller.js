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
exports.BookController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const book_1 = require("@app/data/book");
const util_1 = require("@app/data/util");
const util_2 = require("@app/data/util");
const book_validate_1 = require("./book.validate");
const book_2 = require("@app/server/services/book");
const authorization_1 = require("@app/common/authorization");
let BookController = class BookController extends util_1.BaseController {
    async addBookToLibrary(req, res, body) {
        try {
            const book = await book_2.BookSer.addBook(body);
            this.handleSuccess(req, res, book);
        }
        catch (error) {
            this.handleError(req, res, error);
        }
    }
    async viewAllBooks(req, res) {
        try {
            const books = await book_1.BookRepo.all({});
            this.handleSuccess(req, res, books);
        }
        catch (error) {
            this.handleError(req, res, error);
        }
    }
    async returnBook(req, res, id) {
        try {
            //@ts-ignore
            const book = await book_2.BookSer.returnBook(req.user, id);
            this.handleSuccess(req, res, book);
        }
        catch (error) {
            this.handleError(req, res, error);
        }
    }
    async borrowBook(req, res, id) {
        try {
            //@ts-ignore
            const books = await book_2.BookSer.borrowBook(req.user, id);
            this.handleSuccess(req, res, books);
        }
        catch (error) {
            console.log("HEADERRR", req.headers);
            this.handleError(req, res, error);
        }
    }
};
__decorate([
    inversify_express_utils_1.httpPost("/", authorization_1.secure, util_2.validate(book_validate_1.isBook)),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "addBookToLibrary", null);
__decorate([
    inversify_express_utils_1.httpGet("/", authorization_1.secure),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "viewAllBooks", null);
__decorate([
    inversify_express_utils_1.httpPost("/:id", authorization_1.secure, util_2.validate(book_validate_1.isID)),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "returnBook", null);
__decorate([
    inversify_express_utils_1.httpGet("/:id", authorization_1.secure),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __param(2, inversify_express_utils_1.requestParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "borrowBook", null);
BookController = __decorate([
    inversify_express_utils_1.controller("/book")
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map