"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSer = void 0;
const bcrypt_1 = require("bcrypt");
const user_repo_1 = require("@app/data/user/user.repo");
const authorization_1 = require("@app/common/authorization");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserService {
    async createUser(user) {
        return await user_repo_1.UserRepo.create({
            name: user.name,
            email_address: user.email_address,
            password: await bcrypt_1.hash(user.password, 10)
        });
    }
    async loginUser(email_address, password, req) {
        const user = await user_repo_1.UserRepo.byQuery({ email_address });
        if (user) {
            const isPassword = await bcrypt_1.compare(password, user.password);
            if (!isPassword) {
                throw new Error("Email or Password is incorrect");
            }
            return await authorization_1.seal(user, process.env.secret, "24h", req);
        }
    }
}
exports.UserSer = new UserService();
//# sourceMappingURL=user.js.map