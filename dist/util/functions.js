"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayUTC = getTodayUTC;
const luxon_1 = require("luxon");
function getTodayUTC() {
    return luxon_1.DateTime.utc().toISO();
}
//# sourceMappingURL=functions.js.map