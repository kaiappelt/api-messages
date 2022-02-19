import { Router } from "express";
import { celebrate, Joi, Segments, errors } from 'celebrate';
import ListMessagesController from "../controllers/ListMessagesController";
import CreateMessageController from "../controllers/CreateMessageController";
import UpdateMessageController from "../controllers/UpdateMessageController";
import DeleteMessageController from "../controllers/DeleteMessageController";
import ShowMessageController from "../controllers/ShowMessageController";
import ShowMessagesByUserIdController from "../controllers/ShowMessagesByUserIdController";

let messagesRoutes = Router();
let listMessagesController = new ListMessagesController();
let createMessageController = new CreateMessageController();
let updateMessageController = new UpdateMessageController();
let deleteMessageController = new DeleteMessageController();
let showMessageController = new ShowMessageController();
let showMessagesByUserIdController = new ShowMessagesByUserIdController();

messagesRoutes.get(
    "/",
    listMessagesController.run
)

messagesRoutes.get(
    "/user-id",
    showMessagesByUserIdController.run
)

messagesRoutes.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required()
        }
    }),
    showMessageController.run
)

messagesRoutes.post(
    "/", 
    celebrate({
        [Segments.BODY]:{
            description: Joi.string().required(),
            details: Joi.string().required(),
        }
    }),
    createMessageController.run
);

messagesRoutes.put(
    "/:id", 
    celebrate({
        [Segments.BODY]:{
            description: Joi.string().required(),
            details: Joi.string().required(),
        },

        [Segments.PARAMS]:{
            id: Joi.string().uuid().required()
        }
    }),
   updateMessageController.run
);

messagesRoutes.delete(
    "/:id", 
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required()
        }
    }),
    deleteMessageController.run
);
export default messagesRoutes;