"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var user_controller_1 = require("./src/controllers/user.controller");
var process_context_controller_1 = require("./src/controllers/process-context.controller");
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
        this.router = express.Router();
        this.config();
        this.routes();
    }
    Server.init = function (port) {
        return new Server(port);
    };
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
    };
    /** Configuration Express. **/
    Server.prototype.config = function () {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.configMongoDb();
        this.configCors();
    };
    /** Configuration mongodb **/
    Server.prototype.configMongoDb = function () {
        var MONGO_URI = 'mongodb://localhost/db-collaborative';
        mongoose.connect(MONGO_URI || process.env.MONGO_URI);
    };
    Server.prototype.configCors = function () {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    /** Configuration API endpoints. **/
    Server.prototype.routes = function () {
        this.router = express.Router();
        this.app.use('/', this.router);
        this.app.use('/users', user_controller_1.default);
        this.app.use('/process-context', process_context_controller_1.default.router);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map