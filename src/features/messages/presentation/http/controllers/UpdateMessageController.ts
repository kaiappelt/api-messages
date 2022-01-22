import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateMessagesService from "../../service/UpdateMessageService";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class UpdateMessageController implements IController {
    public async run(
        request: Request, 
        response: Response
        ):Promise<Response> {
        const { id } = request.params;
        const { description, details } = request.body;

        const updateMessage = container.resolve(UpdateMessagesService);

        const message = await updateMessage.execute({
           id,
           description,
           details
        });

        return response.json(message);
    }
}