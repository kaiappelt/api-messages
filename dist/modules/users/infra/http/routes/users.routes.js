"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var UsersController_1 = __importDefault(require("../controllers/UsersController"));
var isAuthnticated_1 = __importDefault(require("@shared/infra/http/middlewares/isAuthnticated"));
var usersRoutes = (0, express_1.Router)();
var usersController = new UsersController_1.default();
// Para listar os usuários cadastrados, é preciso estar autenticado
usersRoutes.get("/", isAuthnticated_1.default, usersController.index);
usersRoutes.post("/", (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
        // Verifica se os campos Senha e Confirmação de Senha são iguais
        password_confirmation: celebrate_1.Joi.string()
            .valid(celebrate_1.Joi.ref("password"))
            .when("password", {
            is: celebrate_1.Joi.exist(),
            then: celebrate_1.Joi.required(),
        })
    },
    _a)), usersController.create);
exports.default = usersRoutes;
