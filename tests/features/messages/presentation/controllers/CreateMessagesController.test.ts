import request from 'supertest';
import { app } from "../../../../../src/core/presentation/http/main";

describe('CreateMessagesController', () => {
    it('Estando autenticado, deve cadastrar uma mensagem', async () => {
        await request(app).post('/users').send({
            name: 'usuário teste',
            email: 'usuario@teste.com.br',
            password: '12345678',
            password_confirmation: '12345678',
        });

        const responseAuth = await request(app).post('/auth').send({
            email: 'usuario@teste.com.br',
            password: '12345678',
        });

        const token = responseAuth.body.token;

        const response = await request(app)
            .post('/messages')
            .send({
                description: "mensagem teste",
                details: "mensagem teste"
            })
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
    });

    it('Não deve cadastrar, quando não houver autenticação', async () => {
        expect(
            request(app)
            .get('/messages')
            .send({
                description: "mensagem teste",
                details: "mensagem teste"
            })
        ).rejects;
    });
});