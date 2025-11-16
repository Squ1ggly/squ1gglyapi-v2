"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = testController;
function testController(req, res, next) {
    try {
        console.log(req.body);
        console.log(req.raw);
        res.status(200).send("Hello world!");
        return;
    }
    catch (error) {
        next(error);
        return;
    }
}
//# sourceMappingURL=template.js.map