import { Request, Response } from "express";
import { container } from "tsyringe";
import ListMessagesService from "../../domain/services/ListMessagesService";
import { IController } from "../../../../core/presentation/contracts/IController";

export default class ListMessagesController implements IController {
    public async run(
        request: Request,
        response: Response
        ):Promise<Response> {
            const listMessages = container.resolve(ListMessagesService);

            const messages = await listMessages.execute();
        
            return response.json(messages);
    }
}