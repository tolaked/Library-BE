"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("./user.schema");
const database_1 = require("../database");
class UserRepository extends database_1.BaseRepository {
    constructor() {
        super(mongoose_1.connection, "User", user_schema_1.UserSchema);
    }
}
exports.UserRepo = new UserRepository();
//# sourceMappingURL=user.repo.js.map