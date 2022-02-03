import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowMessagesByUserIdService from "../../../domain/service/ShowMessagesByUserIdService";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class ShowMessagesByUserIdController implements IController {
    public async run(
        request: Request, 
        response: Response
        ):Promise<Response> {
        const { user_id } = request.params;

        const showMessages = container.resolve(ShowMessagesByUserIdService);

        const messages = await showMessages.execute({ user_id });

        return response.json(messages);
    }
}