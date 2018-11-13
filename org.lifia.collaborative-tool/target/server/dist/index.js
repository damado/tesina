"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var http = require("http");
var event_dispatcher_1 = require("./src/events/event.dispatcher");
var serverExpress = server_1.default.init(3000);
var server = http.createServer(serverExpress.app);
var eventDispatcher = new event_dispatcher_1.default(server);
server.listen(3000, function () {
    console.log("Server started on port " + server.address().port);
});
exports.default = eventDispatcher;
//# sourceMappingURL=index.js.map