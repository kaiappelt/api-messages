"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ListMessagesController_1 = __importDefault(require("../controllers/ListMessagesController"));
var CreateMessageController_1 = __importDefault(require("../controllers/CreateMessageController"));
var UpdateMessageController_1 = __importDefault(require("../controllers/UpdateMessageController"));
var DeleteMessageController_1 = __importDefault(require("../controllers/DeleteMessageController"));
var ShowMessageController_1 = __importDefault(require("../controllers/ShowMessageController"));
var ShowMessagesByUserIdController_1 = __importDefault(require("../controllers/ShowMessagesByUserIdController"));
var messagesRoutes = (0, express_1.Router)();
var listMessagesController = new ListMessagesController_1.default();
var createMessageController = new CreateMessageController_1.default();
var updateMessageController = new UpdateMessageController_1.default();
var deleteMessageController = new DeleteMessageController_1.default();
var showMessageController = new ShowMessageController_1.default();
var showMessagesByUserIdController = new ShowMessagesByUserIdController_1.default();
messagesRoutes.get("/", listMessagesController.run);
messagesRoutes.get("/user/:user_id", (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        user_id: celebrate_1.Joi.string().uuid().required()
    },
    _a)), showMessagesByUserIdController.run);
messagesRoutes.get("/:id", (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required()
    },
    _b)), showMessageController.run);
messagesRoutes.post("/", (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        user_id: celebrate_1.Joi.string().uuid().required(),
        description: celebrate_1.Joi.string().required(),
        details: celebrate_1.Joi.string().required(),
    },
    _c)), createMessageController.run);
messagesRoutes.put("/:id", (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.BODY] = {
        description: celebrate_1.Joi.string().required(),
        details: celebrate_1.Joi.string().required(),
    },
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required()
    },
    _d)), updateMessageController.run);
messagesRoutes.delete("/:id", (0, celebrate_1.celebrate)((_e = {},
    _e[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required()
    },
    _e)), deleteMessageController.run);
exports.default = messagesRoutes;
