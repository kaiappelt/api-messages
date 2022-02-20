import request from "supertest";
import { app } from "../../../../../src/core/presentation/http/main";

describe("CreateSessionsController", () => {
    it("Deve realizar autenticação de um usuário", async () => {
        const responseUser = await request(app).post("/users").send({
            name: "testes de integração",
            email: "tests@hotmail.com",
            password: "12345678",
            password_confirmation: "12345678"
        });

        const responseAuth = await request(app)
            .post("/auth")
            .send({
                email: "tests@hotmail.com",
                password: "12345678",
            });

        expect(responseAuth.body).toHaveProperty("token");
    })

    it('Não deve autenticar com um usuário inexistente', async () => {
        expect(
          request(app).post('/auth').send({
            email: 'usuario-inexistente@testes.com.br',
            password: '12345678',
          }),
        ).rejects;
    });
    
      it('Não deve autenticar quando o usuário fornece uma senha errada', async () => {
        await request(app).post('/users').send({
          name: 'testes integração',
          email: 'testes@testes.com.br',
          password: '12345678',
          password_confirmation: '12345678',
        });
    
        expect(
          request(app).post('/auth').send({
            email: 'testes@testes.com.br',
            password: '1234senha-diferente',
          }),
        ).rejects;
    });
})