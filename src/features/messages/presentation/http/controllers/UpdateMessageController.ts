import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateMessagesService from "../../../domain/services/UpdateMessageService";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class UpdateMessageController implements IController {
    public async run(
        request: Request, 
        response: Response
        ):Promise<Response> {
        const user_id_session = request.user.id;    
        const { id } = request.params;
        const { description, details } = request.body;

        const updateMessage = container.resolve(UpdateMessagesService);

        const message = await updateMessage.execute({
           user_id_session,
           id,
           description,
           details
        });

        return response.json(message);
    }
}