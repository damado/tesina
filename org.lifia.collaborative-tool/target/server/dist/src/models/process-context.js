"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roles_context_1 = require("./roles-context");
var CollaborativeActivityContextSchema = new mongoose_1.Schema({
    collaborativeActivityName: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    users: [{
            type: String
        }],
    roles: [roles_context_1.default]
});
exports.default = mongoose_1.model('CollaborativeActivityContextSchema', CollaborativeActivityContextSchema);
//# sourceMappingURL=process-context.js.map