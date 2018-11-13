"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RolesContextSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: '',
    },
    usersNumber: {
        type: Number,
        default: 0,
    }
});
var CollaborativeActivityContextSchema = new mongoose_1.Schema({
    collaborativeActivityName: {
        type: String,
        default: '',
    },
    users: [{
            type: String
        }],
    roles: [RolesContextSchema],
    room: { type: String }
});
var RolesContext = mongoose_1.model('RolesContext', RolesContextSchema);
exports.RolesContext = RolesContext;
var CollaborativeActivityContext = mongoose_1.model('CollaborativeActivityContext', CollaborativeActivityContextSchema);
exports.CollaborativeActivityContext = CollaborativeActivityContext;
CollaborativeActivityContextSchema.pre('save', function (next) {
    var doc = this;
    CollaborativeActivityContext.findByIdAndUpdate({ _id: doc._id }, { $inc: { seq: 1 } }, function (error, counter) {
        console.log("this", doc);
        if (error)
            return next(error);
        doc.room = counter.toString();
        next();
    });
});
//# sourceMappingURL=collaborative-activity-context.js.map