import { Router } from "express";
import usersRoutes from "../modules/users/routes/users.routes";
import messagesRoutes from "../modules/messages/routes/messages.routes";
import sessionsRouter from "../modules/auth/routes/sessions.routes";
import isAuthenticated from "../middlewares/isAuthnticated";

const routes = Router();

routes.use("/auth", sessionsRouter);
routes.use("/users", usersRoutes);
routes.use("/messages", isAuthenticated, messagesRoutes);

export default routes;