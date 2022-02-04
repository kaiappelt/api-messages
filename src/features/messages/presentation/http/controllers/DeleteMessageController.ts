import { Request, Response } from "express";
import { container } from "tsyringe";
import DeleteMessagesService from "../../../domain/services/DeleteMessageService";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class DeleteMessageController implements IController {
    public async run(
        request: Request, 
        response: Response
        ):Promise<Response> {
            const { id } = request.params;

            const deleteMessage = container.resolve(DeleteMessagesService);

            await deleteMessage.execute({ id });

            return response.json([]);
        }
}