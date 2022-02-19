import 'reflect-metadata';
import FakeUsersRepository from '../../../users/infra/repositories/FakeUsersRepository';
import FakeHashProvider from '../../../users/domain/providers/FakeHashProvider';
import AppError from '../../../../../src/core/domain/errors/AppError';
import CreateSessionsService from '../../../../../src/features/auth/domain/services/CreateSessionsService';


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSessionsService: CreateSessionsService;

describe("CreateSessionsService", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createSessionsService = new CreateSessionsService(fakeUsersRepository, fakeHashProvider);
    });

    it("Deve fazer a autenticcação de um usuário", async () => {
        const user = await fakeUsersRepository.create({
            name: "kai",
            email: "kai@gmail.com",
            password: "123456",
        });
        
        const response = await createSessionsService.execute({
            email: "kai@gmail.com",
            password: "123456",
        });
        const userSession = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        expect(response).toHaveProperty("token");
        expect(response.user).toEqual(userSession);

    });

    it("Não deve autenticar com um usuário que não existe", async () => {
        expect(
            createSessionsService.execute({
                email: "kai@gmail.com",
                password: "123456",
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve autenticar quando o usuário fornece uma senha errada", async () => {
         await fakeUsersRepository.create({
            name: "kai",
            email: "kai@gmail.com",
            password: "123456",
        });
        expect(
            createSessionsService.execute({
                email: "kai@gmail.com",
                password: "654321",
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

