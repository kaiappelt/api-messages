import { Request, Response } from "express";
import { container } from "tsyringe";
import ListMessagesService from "@modules/messages/service/ListMessagesService";
import CreateMessagesService from "@modules/messages/service/CreateMessagesService";
import ShowMessageService from "@modules/messages/service/ShowMessageService";
import UpdateMessagesService from "@modules/messages/service/UpdateMessageService";
import DeleteMessagesService from "@modules/messages/service/DeleteMessageService";

export default class MessagesController {
    public async index(
        request: Request,
        response: Response
        ):Promise<Response> {
            const listMessages = container.resolve(ListMessagesService);

            const messages = await listMessages.execute();
        
            return response.json(messages);
    }

    public async show(
        request: Request, 
        response: Response
        ):Promise<Response> {
        const { id } = request.params;

        const showMessage = container.resolve(ShowMessageService);

        const message = await showMessage.execute({ id });

        return response.json(message);
    }

    public async create(
        request: Request, 
        response: Response
        ):Promise<Response> {
        const { description, details } = request.body;

        const createMessage = container.resolve(CreateMessagesService);

        const message = await createMessage.execute({
           description,
           details
        });

        return response.json(message);
    }

    public async update(
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

    public async delete(
        request: Request, 
        response: Response
        ):Promise<Response> {
            const { id } = request.params;

            const deleteMessage = container.resolve(DeleteMessagesService);

            await deleteMessage.execute({ id });

            return response.json([]);
        }
}