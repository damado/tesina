"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../models/User");
var UserController = /** @class */ (function () {
    function UserController() {
        this.router = express_1.Router();
        this.routes();
    }
    UserController.prototype.getUsers = function (req, res) {
        User_1.default.find({})
            .then(function (data) {
            var status = res.statusCode;
            res.status(200).json({
                status: status,
                data: data
            });
        })
            .catch(function (error) {
            var status = res.statusCode;
            res.json({
                status: status,
                error: error
            });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var role = req.body.role;
        var user = new User_1.default({
            username: username,
            password: password,
            role: role
        });
        user.save({})
            .then(function (data) {
            var status = res.statusCode;
            res.status(200).json({
                status: status,
                data: data
            });
        })
            .catch(function (error) {
            var status = res.statusCode;
            res.json({
                status: status,
                error: error
            });
        });
    };
    UserController.prototype.getUser = function (req, res) {
        var user = {
            username: req.body.username,
            password: req.body.password
        };
        User_1.default.find(user)
            .then(function (data) {
            var status = res.statusCode;
            res.status(200).json({
                status: status,
                data: data
            });
        })
            .catch(function (error) {
            var status = res.statusCode;
            res.json({
                status: status,
                error: error
            });
        });
    };
    UserController.prototype.routes = function () {
        this.router.get('/', this.getUsers);
        this.router.post('/', this.createUser);
        this.router.post('/login', this.getUser);
    };
    return UserController;
}());
var userController = new UserController();
userController.routes();
exports.default = userController.router;
//# sourceMappingURL=user.controller.js.map