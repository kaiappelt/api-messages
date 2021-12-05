"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var index_1 = __importDefault(require("../../config/index"));
var AppError_1 = __importDefault(require("../../AppError"));
var jsonwebtoken_1 = require("jsonwebtoken");
var usuarios;
usuarios = [
    {
        id: "4a98a851-6cbf-4da2-89d0-5240efe5a71b",
        email: "teste@gmail.com",
        password: "12345678"
    }
];
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.auth = function (request, response) {
        var _a = request.body, email = _a.email, password = _a.password;
        var user = {
            id: "",
            email: ""
        };
        var userExists;
        userExists = false;
        // Verifica se existe um email e senha
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email === email && usuarios[i].password === password) {
                user.id = usuarios[i].id;
                user.email = usuarios[i].email;
                userExists = true;
            }
        }
        if (!userExists) {
            // Gera uma exceção de erro
            throw new AppError_1.default("E-mail ou senha incorretos!", 401);
        }
        var token = (0, jsonwebtoken_1.sign)({}, index_1.default.jwt.secret, {
            subject: user.id,
            expiresIn: index_1.default.jwt.expiresIn,
        });
        response.json({
            token: token,
            user: user,
        });
    };
    UsersController.prototype.index = function (request, response) {
        response.json(usuarios);
    };
    UsersController.prototype.create = function (request, response) {
        var _a = request.body, email = _a.email, password = _a.password;
        var userExists;
        userExists = false;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email === email) {
                userExists = true;
            }
        }
        if (userExists) {
            // Gera uma exeption de erro
            throw new AppError_1.default("Já existe um usuário com este e-mail!", 412);
        }
        var uuid = (0, uuid_1.v4)();
        var novoUsuario = {
            id: uuid,
            email: email,
            password: password
        };
        usuarios.push(novoUsuario);
        response.json(novoUsuario);
    };
    UsersController.prototype.update = function (req, res) {
        var id = req.params.id;
        var userExists;
        userExists = false;
        // Verifica se existe um usuário
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == id) {
                userExists = true;
            }
        }
        if (!userExists) {
            // Gera uma exeption de erro
            throw new AppError_1.default("Usuário não encontrado!", 412);
        }
        var _a = req.body, email = _a.email, password = _a.password;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == id) {
                // Atualiza as informações do id específico
                usuarios[i].email = email;
                usuarios[i].password = password;
            }
        }
        res.status(200).json({
            email: email,
            password: password,
        });
    };
    UsersController.prototype.delete = function (req, res) {
        var id = req.params.id;
        var userExists;
        userExists = false;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == id) {
                userExists = true;
            }
        }
        if (!userExists) {
            // Gera uma exeption de erro
            throw new AppError_1.default("Usuário não encontrado!", 412);
        }
        // percorre o array procurando o id passado por parametro
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == id) {
                //exclui o objeto com id encontrado
                usuarios.splice(i, 1);
            }
        }
        res.json([]);
    };
    return UsersController;
}());
exports.default = UsersController;
