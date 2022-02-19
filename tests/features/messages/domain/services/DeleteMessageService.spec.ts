import 'reflect-metadata';
import FakeMessagesRepository from '../../../messages/infra/repositories/FakeMessagesRepository';
import FakeUsersRepository from '../../../users/infra/repositories/FakeUsersRepository';
import  DeleteMessageService from '../../../../../src/features/messages/domain/services/DeleteMessageService';
import RedisCache from '../../../../../src/core/infra/repositories/CacheRepository';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../../../../../src/core/domain/errors/AppError';

let fakeMessagesRepository: FakeMessagesRepository;
let fakeUsersRepository: FakeUsersRepository;
let deleteMessageService: DeleteMessageService;
let redisCache: RedisCache;

describe("DeleteMessageService", () => {
    beforeEach(() => {
        fakeMessagesRepository = new FakeMessagesRepository();
        fakeUsersRepository = new FakeUsersRepository();
        redisCache = new RedisCache();
        deleteMessageService = new DeleteMessageService(fakeMessagesRepository, redisCache);
    });
it('Deve excluir uma mensagem existente', async () => {
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

 await deleteMessageService.execute({
    user_id_session: user.id,
    id: message.id,
  });

  expect([]);
});

it("Não pode excluir uma mensagem que não existe", async () => {
  const user = await fakeUsersRepository.create({
    name: "kai",
    email: "kai@gmail.com",
    password: "123456"
  });

    expect(
        deleteMessageService.execute({
          user_id_session: user.id,
          id: uuidv4(), // Mensagem que não existe
      }),
      ).rejects.toBeInstanceOf(AppError);
    });
});