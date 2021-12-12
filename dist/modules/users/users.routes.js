"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var UsersController_1 = __importDefault(require("./UsersController"));
var usersRoutes = (0, express_1.Router)();
var usersController = new UsersController_1.default();
usersRoutes.post("/", 
//MIDDLEWARE
// Validação dos campos utilizando o celebrate
(0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
        password_confirmation: celebrate_1.Joi.string()
            .valid(celebrate_1.Joi.ref("password"))
            .when("password", {
            is: celebrate_1.Joi.exist(),
            then: celebrate_1.Joi.required(),
        })
    },
    _a)), 
// Chama o controller
usersController.create);
usersRoutes.put("/:id", 
//MIDDLEWARE DE AUTENTICAÇÃO
//MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
(0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
    _b[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _b)), usersController.update);
usersRoutes.delete("/:id", 
//MIDDLEWARE DE AUTENTICAÇÃO
//MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
(0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), usersController.delete);
exports.default = usersRoutes;
