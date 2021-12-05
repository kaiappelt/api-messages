"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("../AppError"));
var jsonwebtoken_1 = require("jsonwebtoken");
var index_1 = __importDefault(require("../config/index"));
function isAuthenticated(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default("Token não informado!");
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decodeToken = (0, jsonwebtoken_1.verify)(token, index_1.default.jwt.secret);
        return next();
    }
    catch (_b) {
        throw new AppError_1.default("Token inválido!", 401);
    }
}
exports.default = isAuthenticated;
