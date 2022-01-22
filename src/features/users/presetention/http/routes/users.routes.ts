import { Router } from "express";
import { celebrate, Joi, Segments, errors } from 'celebrate';
import isAuthenticated from "../../../../../core/presentation/http/middlewares/isAuthnticated";
import CreateUserController from "../controllers/CreateUserController";
import ListUsersController from "../controllers/ListUsersController";

let usersRoutes = Router();
let listUsersController = new ListUsersController();
let createUserController = new CreateUserController();

// Para listar os usuários cadastrados, é preciso estar autenticado
usersRoutes.get(
    "/",
    isAuthenticated,
    listUsersController.run
)

usersRoutes.post(
    "/", 
    celebrate({
        [Segments.BODY]:{
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            
            // Verifica se os campos Senha e Confirmação de Senha são iguais
            password_confirmation: Joi.string()
                .valid(Joi.ref("password"))
                .when("password", {
                    is: Joi.exist(), 
                    then: Joi.required(),
                })
        }
    }),
  createUserController.run
);

export default usersRoutes;