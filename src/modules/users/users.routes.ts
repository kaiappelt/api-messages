import { Router } from "express";
import { celebrate, Joi, Segments, errors } from 'celebrate';
import UsersController from "./UsersController";
import { join } from "path/posix";

let usersRoutes = Router();
let usersController = new UsersController();

usersRoutes.get(
    "/",
    //MIDDLEWARE
    usersController.index
);

usersRoutes.post(
    "/auth", 
    //MIDDLEWARE
    // Validação dos campos utilizando o celebrate
    celebrate({
        [Segments.BODY]:{
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    // Chama o controller
    usersController.auth
);


usersRoutes.post(
    "/", 
    //MIDDLEWARE
    // Validação dos campos utilizando o celebrate
    celebrate({
        [Segments.BODY]:{
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .valid(Joi.ref("password"))
                .when("password", {
                    is: Joi.exist(), 
                    then: Joi.required(),
                })
        }
    }),
    // Chama o controller
    usersController.create
);

usersRoutes.put(
    "/:id",
    //MIDDLEWARE DE AUTENTICAÇÃO
    //MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
    celebrate({
        [Segments.BODY]:{
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required(),
        }
    }),

    usersController.update
)

usersRoutes.delete(
    "/:id",
      //MIDDLEWARE DE AUTENTICAÇÃO
      //MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
      celebrate({
          [Segments.PARAMS]:{
              id: Joi.string().uuid().required(),
          }
      }),
      usersController.delete
);

export default usersRoutes;