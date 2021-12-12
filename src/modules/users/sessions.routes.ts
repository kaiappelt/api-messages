import { Router } from "express";
import { celebrate, Joi, Segments, errors } from 'celebrate';
import UsersController from "./UsersController";

let sessionsRouter = Router();
let usersController = new UsersController();

sessionsRouter.post(
    "/",
    celebrate({
        [Segments.BODY]:{
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    usersController.auth
);

export default sessionsRouter;