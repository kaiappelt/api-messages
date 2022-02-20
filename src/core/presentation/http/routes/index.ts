import { Router } from "express";
import usersRoutes from "../../../../features/users/presentation/routes/users.routes";
import sessionsRouter from "../../../../features/auth/presentation/routes/sessions.routes";
import messagesRoutes from "../../../../features/messages/presentation/routes/messages.routes";
import isAuthenticated from "../middlewares/isAuthnticated";
const routes = Router();

routes.use("/auth", sessionsRouter);
routes.use("/users", usersRoutes);
routes.use("/messages", isAuthenticated, messagesRoutes);

export default routes;