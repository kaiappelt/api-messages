import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowMessageService from "../../../domain/services/ShowMessageService";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class ShowMessageController implements IController{
    public async run(
        request: Request, 
        response: Response
        ):Promise<Response> {
        const { id } = request.params;

        const showMessage = container.resolve(ShowMessageService);

        const message = await showMessage.execute({ id });

        return response.json(message);
    }
}