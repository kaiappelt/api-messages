import RedisCache from "@shared/infra/repositories/CacheRepository";
import { inject, injectable } from "tsyringe";
import { IMessage } from "../../domain/models/IMessage";
import { IMessagesUserId } from "../../domain/models/IMessagesUserId";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

@injectable()
class ShowMessagesByUserIdService {
    constructor(
        @inject("MessageRepository")
        private messageRepository: IMessageRepository,
        private redisCache:RedisCache
    ) {}

    public async execute({ user_id }: IMessagesUserId): Promise<IMessage[]> {
        let messages = await this.redisCache.recover<IMessage[]>(
            "api-messages-MESSAGES-USER-ID"
          );
      
          if(!messages){
            messages = await this.messageRepository.findAllByUserId(user_id);
      
            await this.redisCache.save("api-messages-MESSAGES-USER-ID", messages);
          }
          
          return messages;
    }
}

export default ShowMessagesByUserIdService;