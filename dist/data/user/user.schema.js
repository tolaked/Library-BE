"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const database_1 = require("../database");
const schema_1 = require("../util/schema");
const mongoose_1 = require("mongoose");
exports.UserSchema = database_1.SchemaFactory({
    name: Object.assign(Object.assign({}, schema_1.trimmedString), { required: true, index: true }),
    email_address: Object.assign(Object.assign({}, schema_1.trimmedString), { required: true, index: true }),
    books_borrowed: { type: mongoose_1.SchemaTypes.Array, default: [], index: true },
    password: Object.assign(Object.assign({}, schema_1.trimmedString), { required: true })
});
//# sourceMappingURL=user.schema.js.map