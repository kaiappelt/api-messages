"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var AppError_1 = __importDefault(require("../../AppError"));
var messages;
messages = [
    {
        id: '3fc18d8e-a6be-4ae6-8a6a-f28d28895b23',
        description: 'Limpar o quintal',
        details: 'Cortar a grama'
    },
    {
        id: '8c929f57-81d4-40f1-ae46-6814044ff6c5',
        description: 'Consertar a pia',
        details: 'Cano está quebrado'
    },
];
var MessagesController = /** @class */ (function () {
    function MessagesController() {
    }
    MessagesController.prototype.index = function (request, response) {
        response.json(messages);
    };
    MessagesController.prototype.show = function (request, response) {
        var id = request.params.id;
        var messageExists;
        messageExists = false;
        // Verifica se existe um usuário
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                messageExists = true;
            }
        }
        if (!messageExists) {
            // Gera uma exeption de erro
            throw new AppError_1.default("Registro não encontrado!");
        }
        var message = {};
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                message = messages[i];
            }
        }
        response.json(message);
    };
    MessagesController.prototype.create = function (request, response) {
        var _a = request.body, description = _a.description, details = _a.details;
        var uuid = (0, uuid_1.v4)();
        var newMessage = {
            id: uuid,
            description: description,
            details: details
        };
        messages.push(newMessage);
        response.json(newMessage);
    };
    MessagesController.prototype.update = function (req, res) {
        var id = req.params.id;
        var messageExists;
        messageExists = false;
        // Verifica se existe um usuário
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                messageExists = true;
            }
        }
        if (!messageExists) {
            // Gera uma exeption de erro
            throw new AppError_1.default("Registro não encontrado!");
        }
        var _a = req.body, description = _a.description, details = _a.details;
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                // Atualiza as informações do id específico
                messages[i].description = description;
                messages[i].details = details;
            }
        }
        res.status(200).json({
            description: description,
            details: details,
        });
    };
    MessagesController.prototype.delete = function (req, res) {
        var id = req.params.id;
        var messageExists;
        messageExists = false;
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                messageExists = true;
            }
        }
        if (!messageExists) {
            // Gera uma exeption de erro
            throw new AppError_1.default("Registro não encontrado!");
        }
        // percorre o array procurando o id passado por parametro
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                //exclui o objeto com id encontrado
                messages.splice(i, 1);
            }
        }
        res.json([]);
    };
    return MessagesController;
}());
exports.default = MessagesController;
