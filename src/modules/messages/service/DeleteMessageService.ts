import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteMessage } from "../domain/models/IDeleteMessage";
import { IMessageRepository } from "../domain/repositories/IMessageRepository";

@injectable()
class DeleteMessagesService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository
    ) {}

    public async execute({
        id,
    }: IDeleteMessage): Promise<void> {
        const message = await this.messageRepository.findById(id);

        if(!message) {
            throw new AppError("Registro não encontrado!", 400);
        }

        await this.messageRepository.remove(message);
    }
}

export default DeleteMessagesService;