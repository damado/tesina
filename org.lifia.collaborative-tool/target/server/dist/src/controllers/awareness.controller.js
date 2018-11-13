"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Awareness_1 = require("../models/Awareness");
var AwarenessController = /** @class */ (function () {
    function AwarenessController() {
    }
    AwarenessController.prototype.create = function (username, data) {
        var awareness = new Awareness_1.default({
            username: username,
            data: data
        });
        // awareness.isNew = false;
        // awareness.save().then((data) => {
        // console.log("holaa", pt.getWss().clients);
        // ws.getWss().clients.forEach(c => {
        // 	c.send("envio dataaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        // })
        // });
        // console.log(pt);
        // pt.send("te envio algo");
    };
    return AwarenessController;
}());
var awarenessController = new AwarenessController();
exports.default = awarenessController;
//# sourceMappingURL=awareness.controller.js.map