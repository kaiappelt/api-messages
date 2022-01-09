"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var MessagesControler_1 = __importDefault(require("../controllers/MessagesControler"));
var messagesRoutes = (0, express_1.Router)();
var messagesController = new MessagesControler_1.default();
messagesRoutes.get("/", messagesController.index);
messagesRoutes.get("/user/:user_id", (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        user_id: celebrate_1.Joi.string().uuid().required()
    },
    _a)), messagesController.showByUserId);
messagesRoutes.get("/:id", (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required()
    },
    _b)), messagesController.show);
messagesRoutes.post("/", (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        user_id: celebrate_1.Joi.string().uuid().required(),
        description: celebrate_1.Joi.string().required(),
        details: celebrate_1.Joi.string().required(),
    },
    _c)), messagesController.create);
messagesRoutes.put("/:id", (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.BODY] = {
        description: celebrate_1.Joi.string().required(),
        details: celebrate_1.Joi.string().required(),
    },
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required()
    },
    _d)), messagesController.update);
messagesRoutes.delete("/:id", (0, celebrate_1.celebrate)((_e = {},
    _e[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required()
    },
    _e)), messagesController.delete);
exports.default = messagesRoutes;
