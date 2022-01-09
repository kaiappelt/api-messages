import AppError from "../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IMessage } from "../domain/models/IMessage";
import { IShowMessage } from "../domain/models/IShowMessage";
import { IMessageRepository } from "../domain/repositories/IMessageRepository";

@injectable()
class ShowMessageService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository
    ) {}

    public async execute({ id }: IShowMessage): Promise<IMessage | undefined> {
        const message = await this.messageRepository.findById(id);

        if(!message) {
            throw new AppError("Regístro não encontrado!", 400)
        }

        return message;
    }
}

export default ShowMessageService;