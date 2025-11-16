"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorMiddleware;
function errorMiddleware(error, req, res, next) {
    console.error(error);
    if (res.headersSent) {
        return;
    }
    res.sendStatus(500);
    return;
}
//# sourceMappingURL=error-middleware.js.map