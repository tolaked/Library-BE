"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepo = void 0;
const mongoose_1 = require("mongoose");
const book_schema_1 = require("./book.schema");
const database_1 = require("../database");
class BookRepository extends database_1.BaseRepository {
    constructor() {
        super(mongoose_1.connection, "Book", book_schema_1.BookSchema);
    }
}
exports.BookRepo = new BookRepository();
//# sourceMappingURL=book.repo.js.map