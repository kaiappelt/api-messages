import 'reflect-metadata';
import FakeUsersRepository from '../../../users/infra/repositories/FakeUsersRepository';
import ListUsersService from '../../../../../src/features/users/domain/services/ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsersService: ListUsersService;


describe("ListUsersService", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listUsersService = new ListUsersService(fakeUsersRepository);
    });

    it("Deve listar os usuários cadastrados", async () => {
        await fakeUsersRepository.create({
            name: "kai",
            email: "kai@gmail.com",
            password: "123456",
        });
        const users = await listUsersService.execute();

        expect(Array.isArray(users)).toEqual(true);
    });
});