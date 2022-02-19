import 'reflect-metadata';
import FakeMessagesRepository from '../../../messages/infra/repositories/FakeMessagesRepository';
import CreateMessagesService from '../../../../../src/features/messages/domain/services/CreateMessagesService';
import RedisCache from '../../../../../src/core/infra/repositories/CacheRepository';
import { v4 as uuidv4 } from 'uuid';
import FakeUsersRepository from '../../../users/infra/repositories/FakeUsersRepository';
import AppError from '../../../../../src/core/domain/errors/AppError';

let fakeMessagesRepository: FakeMessagesRepository;
let fakeUsersRepository: FakeUsersRepository;
let createMessagesService: CreateMessagesService;
let redisCache: RedisCache;


describe("CreateMessagesService", () => {
    beforeEach(() => {
        fakeMessagesRepository = new FakeMessagesRepository();
        fakeUsersRepository = new FakeUsersRepository();
        redisCache = new RedisCache();
        createMessagesService = new CreateMessagesService(fakeMessagesRepository, fakeUsersRepository, redisCache);
    });
it('Deve cadastrar uma nova mensagem com um usuário valido', async () => {
   const user = await fakeUsersRepository.create({
     name: "kai",
     email: "kai@gmail.com",
     password: "123456"
   });
  
  const message =  await createMessagesService.execute({
      user_id: user.id,
      description: 'Teste',
      details: 'Teste',
    });

    expect(message).toHaveProperty("id");
  });
  it("Não pode cadastrar uma mensagem com usuário que não existe", () => {
    expect(
      createMessagesService.execute({
        user_id: uuidv4(),
        description: 'Teste',
        details: 'Teste',
      }),
      ).rejects.toBeInstanceOf(AppError);
    });
});