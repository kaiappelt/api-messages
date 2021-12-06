import { Router } from "express";
import usersRoutes from "../modules/users/users.routes";
import messagesRoutes from "../modules/messages/messages.routes";
import sessionsRouter from "../modules/users/sessions.routes";
import isAuthenticated from "../middlewares/isAuthnticated";

const routes = Router();

routes.use("/auth", sessionsRouter);
routes.use("/", usersRoutes);
routes.use("/messages", isAuthenticated, messagesRoutes);

export default routes;