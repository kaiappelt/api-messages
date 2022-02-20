import request from 'supertest';
import { app } from "../../../../../src/core/presentation/http/main";

describe('ListMessagesController', () => {
    it('Estando autenticado, deve listar todas as mensagens', async () => {
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

        const responseList = await request(app)
            .get('/messages')
            .set('Authorization', `Bearer ${token}`);

        expect(responseList.status).toBe(200);
    });

    it('Não deve listar as mensagens, quando não houver autenticação', async () => {
        expect(request(app).get('/messages')).rejects;
    });
});