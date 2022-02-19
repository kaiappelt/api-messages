import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateMessagesService from "../../../domain/services/CreateMessagesService"
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class CreateMessageController implements IController{
    public async run(
        request: Request, 
        response: Response
        ):Promise<Response> {
        const { description, details } = request.body;

        const user_id_session = request.user.id;

        const createMessage = container.resolve(CreateMessagesService);

        const message = await createMessage.execute({
           user_id: user_id_session,
           description,
           details
        });

        return response.json(message);
    }
}