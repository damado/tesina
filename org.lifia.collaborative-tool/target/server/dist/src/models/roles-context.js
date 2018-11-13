"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RolesContextSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    usersNumber: {
        type: Number,
        default: 0,
        required: true
    }
});
exports.default = mongoose_1.model('RolesContext', RolesContextSchema);
//# sourceMappingURL=roles-context.js.map