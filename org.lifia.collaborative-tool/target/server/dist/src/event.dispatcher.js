"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this.serverWebSocket = new WebSocket.Server();
    }
    EventDispatcher.prototype.initWebSocket = function (server) {
        this.serverWebSocket = new WebSocket.Server({ server: server });
        // this.serverWebSocket.on('connection')
    };
    EventDispatcher.prototype.sendEvent = function (data) {
        this.ws.send(data);
    };
    return EventDispatcher;
}());
exports.default = new EventDispatcher();
//# sourceMappingURL=event.dispatcher.js.map