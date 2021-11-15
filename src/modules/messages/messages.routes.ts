import { Router } from "express";
import { celebrate, Joi, Segments, errors } from 'celebrate';
import MessagesController from "./MessagesController";

let messagesRoutes = Router();
let messagesController = new MessagesController();

messagesRoutes.get(
    "/",
    //MIDDLEWARE
    messagesController.index
);

messagesRoutes.post(
    "/", 
    //MIDDLEWARE
    // Validação dos campos utilizando o celebrate
    celebrate({
        [Segments.BODY]:{
           description: Joi.string().required(),
           details: Joi.string().required()
        }
    }),
    // Chama o controller
    messagesController.create
);

messagesRoutes.put(
    "/:id",
    //MIDDLEWARE DE AUTENTICAÇÃO
    //MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
    celebrate({
        [Segments.BODY]:{
            description: Joi.string().required(),
            details: Joi.string().required()
        },
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required(),
        }
    }),

    messagesController.update
)

messagesRoutes.delete(
    "/:id",
      //MIDDLEWARE DE AUTENTICAÇÃO
      //MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
      celebrate({
          [Segments.PARAMS]:{
              id: Joi.string().uuid().required(),
          }
      }),
      messagesController.delete
);

export default messagesRoutes;