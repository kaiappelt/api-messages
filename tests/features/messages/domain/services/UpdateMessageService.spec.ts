import 'reflect-metadata';
import FakeMessagesRepository from '../../../messages/infra/repositories/FakeMessagesRepository';
import FakeUsersRepository from '../../../users/infra/repositories/FakeUsersRepository';
import  UpdateMessageService from '../../../../../src/features/messages/domain/services/UpdateMessageService';
import RedisCache from '../../../../../src/core/infra/repositories/CacheRepository';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../../../../../src/core/domain/errors/AppError';

let fakeMessagesRepository: FakeMessagesRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateMessageService: UpdateMessageService;
let redisCache: RedisCache;

describe("UpdateMessageService", () => {
    beforeEach(() => {
        fakeMessagesRepository = new FakeMessagesRepository();
        fakeUsersRepository = new FakeUsersRepository();
        redisCache = new RedisCache();
        updateMessageService = new UpdateMessageService(fakeMessagesRepository, redisCache);
    });
it('Deve atualizar uma mensagem ja existente', async () => {
  const user = await fakeUsersRepository.create({
    name: "kai",
    email: "kai@gmail.com",
    password: "123456"
  });

  const message =  await fakeMessagesRepository.create({
    user_id: user.id,
    description: 'Teste',
    details: 'Teste',
  });

  const messageUpdated = await updateMessageService.execute({
    user_id_session: user.id,
    id: message.id,
    description: 'Teste3',
    details: 'Teste3',
  });

  expect(messageUpdated).toHaveProperty("id");
});

it("Não pode atualizar uma mensagem que não existe", async () => {
  const user = await fakeUsersRepository.create({
    name: "kai",
    email: "kai@gmail.com",
    password: "123456"
  });

    expect(
        updateMessageService.execute({
            user_id_session: user.id, 
            id: uuidv4(), // Mensagem que não existe
            description: 'Teste7',
            details: 'Teste7',
      }),
      ).rejects.toBeInstanceOf(AppError);
    });
});