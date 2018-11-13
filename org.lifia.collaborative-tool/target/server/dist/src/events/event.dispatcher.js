"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIO = require("socket.io");
var process_context_controller_1 = require("../controllers/process-context.controller");
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher(server) {
        this.server = server;
        this.io = socketIO.listen(server);
        this.init();
    }
    EventDispatcher.prototype.init = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            console.log("New socket connected");
            _this.subscribeMoverFicha(socket);
        });
        this.io.sockets.emit("broadcast", { data: 'Hola' });
    };
    EventDispatcher.prototype.getSocket = function () {
        return this.io;
    };
    EventDispatcher.prototype.subscribeMoverFicha = function (socket) {
        var _this = this;
        this.socket = socket;
        socket.on("event", function (data) {
            var idRoom = process_context_controller_1.default.findUserRoom(data.user).then(function (context) {
                console.log("idRoom --->>>", context);
                _this.io.in(context._id).emit('moverficha', 'HOLA MUNDO');
            });
        });
    };
    return EventDispatcher;
}());
exports.default = EventDispatcher;
//# sourceMappingURL=event.dispatcher.js.map