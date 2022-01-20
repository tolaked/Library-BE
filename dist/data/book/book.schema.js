"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("../database");
const schema_1 = require("../util/schema");
exports.BookSchema = database_1.SchemaFactory({
    title: Object.assign(Object.assign({}, schema_1.trimmedString), { required: true, index: true }),
    img_url: Object.assign(Object.assign({}, schema_1.trimmedString), { required: true, index: true }),
    copies: { type: mongoose_1.SchemaTypes.Number, index: true, default: 0 }
});
//# sourceMappingURL=book.schema.js.map