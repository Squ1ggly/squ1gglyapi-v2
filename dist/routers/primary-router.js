"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const template_1 = __importDefault(require("../controllers/template"));
const primaryRouter = (0, express_1.Router)();
primaryRouter.route("/test").post(template_1.default).get(template_1.default);
exports.default = primaryRouter;
//# sourceMappingURL=primary-router.js.map