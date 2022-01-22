import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateMessagesService from "../../service/CreateMessagesService";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class CreateMessageController implements IController{
    public async run(
        request: Request, 
        response: Response
        ):Promise<Response> {
        const { user_id, description, details } = request.body;

        const createMessage = container.resolve(CreateMessagesService);

        const message = await createMessage.execute({
           user_id,
           description,
           details
        });

        return response.json(message);
    }
}