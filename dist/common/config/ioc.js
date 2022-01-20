"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("../../server/controllers");
const container = new inversify_1.Container();
exports.default = container;
//# sourceMappingURL=ioc.js.map