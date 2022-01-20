"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = exports.secureMongoOpts = exports.defaultMongoOpts = void 0;
exports.defaultMongoOpts = () => {
    return { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true };
};
exports.secureMongoOpts = (config) => {
    return Object.assign(Object.assign({}, exports.defaultMongoOpts), { user: config.mongodb_username, pass: config.mongodb_password });
};
function createConfig(appEnv, config) {
    return appEnv ? exports.secureMongoOpts(config) : exports.defaultMongoOpts;
}
exports.createConfig = createConfig;
//# sourceMappingURL=connect.js.map