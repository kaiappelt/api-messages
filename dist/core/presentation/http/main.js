"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var celebrate_1 = require("celebrate");
var AppError_1 = __importDefault(require("../../domain/errors/AppError"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
require("../../infra/typeorm");
require("../../domain/container");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.json("Welcome to messages-api");
});
app.use(routes_1.default);
// Habilita o retorno de erros do celebrate
app.use((0, celebrate_1.errors)());
app.use(function (error, request, response, next) {
    // Função personalizada para tratar os erros
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }
    // Caso o erro não venha do AppError, é gerado o outro erro a seguir:
    return response.status(500).json({
        status: "error",
        message: "Erro de servidor",
    });
});
app.listen(process.env.PORT || 3333, function () {
    console.log("servidor iniciou...");
});