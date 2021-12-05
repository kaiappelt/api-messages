"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var MessagesController_1 = __importDefault(require("./MessagesController"));
var messagesRoutes = (0, express_1.Router)();
var messagesController = new MessagesController_1.default();
messagesRoutes.get("/", 
//MIDDLEWARE
messagesController.index);
messagesRoutes.get("/:id", messagesController.show);
messagesRoutes.post("/", 
//MIDDLEWARE
// Validação dos campos utilizando o celebrate
(0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        description: celebrate_1.Joi.string().required(),
        details: celebrate_1.Joi.string().required()
    },
    _a)), 
// Chama o controller
messagesController.create);
messagesRoutes.put("/:id", 
//MIDDLEWARE DE AUTENTICAÇÃO
//MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
(0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        description: celebrate_1.Joi.string().required(),
        details: celebrate_1.Joi.string().required()
    },
    _b[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _b)), messagesController.update);
messagesRoutes.delete("/:id", 
//MIDDLEWARE DE AUTENTICAÇÃO
//MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
(0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), messagesController.delete);
exports.default = messagesRoutes;
