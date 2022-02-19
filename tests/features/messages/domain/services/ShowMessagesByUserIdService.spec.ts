import 'reflect-metadata';
import FakeMessagesRepository from '../../../messages/infra/repositories/FakeMessagesRepository';
import ShowMessagesByUserIdService from '../../../../../src/features/messages/domain/services/ShowMessagesByUserIdService';
import RedisCache from '../../../../../src/core/infra/repositories/CacheRepository';
import { v4 as uuidv4 } from 'uuid';

let fakeMessagesRepository: FakeMessagesRepository;
let showMessagesByUserIdService: ShowMessagesByUserIdService;
let redisCache: RedisCache;

describe("ShowMessagesByUserIdService", () => {
    beforeEach(() => {
        fakeMessagesRepository = new FakeMessagesRepository();
        redisCache = new RedisCache();
        showMessagesByUserIdService = new ShowMessagesByUserIdService(fakeMessagesRepository, redisCache);
    });
it('Deve listar as mensagens cadastrados', async () => {
    const message =  await fakeMessagesRepository.create({
      user_id: uuidv4(),
      description: 'Teste',
      details: 'Teste',
    });
    const user_id = message.user_id;

    const messages = await showMessagesByUserIdService.execute({user_id});

    expect(Array.isArray(messages)).toEqual(true);
  });
});