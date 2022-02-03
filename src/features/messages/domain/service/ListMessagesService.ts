import RedisCache from "@shared/infra/repositories/CacheRepository";
import { inject, injectable } from "tsyringe";
import { IMessage } from "../../domain/models/IMessage";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

@injectable()
class ListMessagesService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository,
        private redisCache:RedisCache
    ) {}

    public async execute(): Promise<IMessage[]> {
        let messages = await this.redisCache.recover<IMessage[]>(
            "api-messages-MESSAGES-LIST"
          );
      
          if(!messages){
            messages = await this.messageRepository.findAll();
      
            await this.redisCache.save("api-messages-MESSAGES-LIST", messages);
          }
          
          return messages;
    }
}

export default ListMessagesService;