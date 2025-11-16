"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middleware/error-middleware"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const node_assert_1 = __importDefault(require("node:assert"));
const primary_router_1 = __importDefault(require("./routers/primary-router"));
(0, dotenv_1.config)();
(0, node_assert_1.default)(process.env.PORT, ".env must contain PORT");
const PORT = process.env.PORT || 5102;
process.on("uncaughtExceptionMonitor", (e) => {
    console.error(e);
});
process.on("uncaughtException", (e) => {
    console.error("Uncaught exception: " + e);
});
const server = (0, express_1.default)();
function main() {
    // Allow from any origin
    server.use((0, cors_1.default)());
    server.use((req, _res, next) => {
        // Omit code from being logged
        console.info(`${req.method} request received PATH: ${req.originalUrl?.split("?")[0]}`);
        next();
    });
    server.use(express_1.default.json({
        limit: "100mb",
        type: "application/json",
        verify: (req, _res, buf, _encoding) => {
            req.raw = buf;
        }
    }));
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use("/api", primary_router_1.default);
    // Fallback redirect
    server.use("/", (req, res, next) => {
        res.status(400).send("Not a valid route");
        return;
    });
    server.listen(PORT, () => {
        console.info(`Listening on port ${PORT} URL: http://localhost:${PORT}`);
    });
    server.use(error_middleware_1.default);
}
main();
//# sourceMappingURL=index.js.map