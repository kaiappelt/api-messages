"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_routes_1 = __importDefault(require("../../../../features/users/presetention/http/routes/users.routes"));
var sessions_routes_1 = __importDefault(require("../../../../features/auth/presentation/http/routes/sessions.routes"));
var messages_routes_1 = __importDefault(require("../../../../features/messages/presentation/http/routes/messages.routes"));
var isAuthnticated_1 = __importDefault(require("../middlewares/isAuthnticated"));
var routes = (0, express_1.Router)();
routes.use("/auth", sessions_routes_1.default);
routes.use("/users", users_routes_1.default);
routes.use("/messages", isAuthnticated_1.default, messages_routes_1.default);
exports.default = routes;
