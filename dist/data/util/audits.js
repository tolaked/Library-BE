"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audits = void 0;
class AuditService {
    log(req, action) {
        const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        return {
            activity: action.activity,
            message: action.message,
            object_id: action.object_id,
            ip_address: ipAddr
        };
    }
}
exports.Audits = new AuditService();
//# sourceMappingURL=audits.js.map