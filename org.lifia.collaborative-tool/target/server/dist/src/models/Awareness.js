"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var AwarenessSchema = new mongoose_1.Schema({
    username: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    data: {
        type: String,
        default: '',
        required: true
    }
});
exports.default = mongoose_1.model('Awareness', AwarenessSchema);
//# sourceMappingURL=Awareness.js.map