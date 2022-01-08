import { Router } from "express";
import { celebrate, Joi, Segments, errors } from 'celebrate';
import MessagesController from "../controllers/MessagesControler";

let messagesRoutes = Router();
let messagesController = new MessagesController();

messagesRoutes.get(
    "/",
    messagesController.index
)

messagesRoutes.get(
    "/:id",
    messagesController.show
)

messagesRoutes.post(
    "/", 
    celebrate({
        [Segments.BODY]:{
            user_id: Joi.string().uuid().required(),
            description: Joi.string().required(),
            details: Joi.string().required(),
        }
    }),
    messagesController.create
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
    messagesController.update
);

messagesRoutes.delete(
    "/:id", 
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required()
        }
    }),
    messagesController.delete
);


export default messagesRoutes;