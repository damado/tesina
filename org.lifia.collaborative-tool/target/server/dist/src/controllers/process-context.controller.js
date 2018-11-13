"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var collaborative_activity_context_1 = require("../models/collaborative-activity-context");
var ContextSettings = require("../config-collaborative-tool");
var index_1 = require("../../index");
var ProcessContextController = /** @class */ (function () {
    function ProcessContextController() {
        this.router = express_1.Router();
        this.routes();
    }
    ProcessContextController.prototype.routes = function () {
        this.router.post('/', this.create.bind(this));
        // this.router.get('/', this.getUsers);
        // this.router.post('/', this.createUser);
    };
    ProcessContextController.prototype.create = function (req, res) {
        var _this = this;
        this.collaborativeActivityName = req.body.collaborativeActivityName;
        this.roleName = req.body.roleName;
        this.username = req.body.username;
        this.roleProcessed = false;
        this.sumUserNumber = false;
        var status = res.statusCode;
        var activityContext = {
            collaborativeActivityName: this.collaborativeActivityName,
        };
        collaborative_activity_context_1.CollaborativeActivityContext.find(activityContext)
            .then((function (data) {
            _this.processActivityContext(data);
        }).bind(this));
        res.status(200).json({
            status: status
        });
    };
    ProcessContextController.prototype.processActivityContext = function (data) {
        var _this = this;
        if (data.length > 0) {
            data.forEach(function (activity) {
                if (!_this.roleProcessed) {
                    _this.activitySearched = activity;
                    var newRoleName = _this.processUserFreeRole();
                    if (newRoleName) {
                        _this.updateActivityContext(newRoleName);
                        return;
                    }
                    return;
                }
            });
        }
        if (!this.roleProcessed) {
            this.createFirstActivityContext();
        }
    };
    ProcessContextController.prototype.createFirstActivityContext = function () {
        var _this = this;
        collaborative_activity_context_1.CollaborativeActivityContext.count({}, function (err, count) {
            var activityContext = new collaborative_activity_context_1.CollaborativeActivityContext({
                collaborativeActivityName: _this.collaborativeActivityName,
                users: [_this.username],
                roles: [_this.createFirsRoleContext()]
            });
            activityContext.save({}).then(function (context) {
                index_1.default.socket.join(context._id);
            });
        });
    };
    ProcessContextController.prototype.createFirsRoleContext = function () {
        return new collaborative_activity_context_1.RolesContext({
            name: this.getFreeFirstRoleInActivity(),
            usersNumber: 1
        });
    };
    ProcessContextController.prototype.createActivityContext = function (roleName) {
        var activityContext = new collaborative_activity_context_1.CollaborativeActivityContext({
            collaborativeActivityName: this.collaborativeActivityName,
            users: [this.username],
            roles: [this.createsRoleContext(roleName)]
        });
        activityContext.save({});
    };
    ProcessContextController.prototype.createsRoleContext = function (roleName) {
        return new collaborative_activity_context_1.RolesContext({
            name: roleName,
            usersNumber: 1
        });
    };
    ProcessContextController.prototype.getFreeFirstRoleInActivity = function () {
        var _this = this;
        var freeRoleFirst;
        ContextSettings.ContextConfiguration.activities.forEach(function (activityConfig) {
            if (activityConfig.name === _this.collaborativeActivityName) {
                freeRoleFirst = activityConfig.roles[0].name;
                return;
            }
        });
        return freeRoleFirst;
    };
    ProcessContextController.prototype.processUserFreeRole = function () {
        var _this = this;
        var newRoleForUser;
        ContextSettings.ContextConfiguration.activities.forEach(function (activityConfig) {
            if (activityConfig.name === _this.activitySearched.collaborativeActivityName) {
                newRoleForUser = _this.processRolesConfig(activityConfig.roles, _this.activitySearched.roles);
            }
        });
        return newRoleForUser;
    };
    ProcessContextController.prototype.getUserRoleInSearchedActivity = function () {
        var _this = this;
        return this.activitySearched.roles.find(function (role) {
            return role.name == _this.roleName;
        });
    };
    ProcessContextController.prototype.processRolesConfig = function (rolesConfig, roles) {
        var _this = this;
        var nameFreeRole;
        var nameSearched = false;
        rolesConfig.forEach(function (roleConfig) {
            if (!nameSearched) {
                var role = _this.searchRoleInActivity(roleConfig, roles);
                if (role && role.usersNumber < roleConfig.usersOnlineNumberAllowed) {
                    nameSearched = true;
                    _this.sumUserNumber = true;
                    nameFreeRole = role.name;
                }
                if (!role) {
                    nameSearched = true;
                    nameFreeRole = roleConfig.name;
                }
            }
        });
        return nameFreeRole;
    };
    ProcessContextController.prototype.searchRoleInActivity = function (roleConfig, roles) {
        return (roles.filter(function (role) { return roleConfig.name === role.name; }))[0];
    };
    ProcessContextController.prototype.updateActivityContext = function (newRoleName) {
        this.roleProcessed = true;
        this.activitySearched.users.push(this.username);
        this.processUserNumber(newRoleName);
        index_1.default.socket.join(this.activitySearched._id);
        this.activitySearched.save();
    };
    ProcessContextController.prototype.processUserNumber = function (roleName) {
        if (this.sumUserNumber) {
            this.updateUsersNumberInActivity(roleName);
            return;
        }
        this.activitySearched.roles.push({
            name: roleName,
            usersNumber: 1
        });
    };
    ProcessContextController.prototype.updateUsersNumberInActivity = function (roleName) {
        this.activitySearched.roles.forEach(function (role) {
            if (role.name === roleName) {
                role.usersNumber++;
            }
        });
    };
    ProcessContextController.prototype.findUserRoom = function (user) {
        var searchedUser = {
            users: {
                "$in": [user]
            }
        };
        return collaborative_activity_context_1.CollaborativeActivityContext.find(searchedUser);
    };
    return ProcessContextController;
}());
var processContextController = new ProcessContextController();
processContextController.routes();
exports.default = processContextController;
//# sourceMappingURL=process-context.controller.js.map