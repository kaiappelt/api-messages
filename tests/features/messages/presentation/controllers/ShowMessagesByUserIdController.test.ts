import request from 'supertest';
import { app } from "../../../../../src/core/presentation/http/main";

let token: string;

describe('ShowMessagesByUserIdController', () => {
    beforeEach(async () => {
        // Cria o usuário
        await request(app).post('/users').send({
            name: 'usuário teste',
            email: 'usuario@teste.com.br',
            password: '12345678',
            password_confirmation: '12345678',
        });

        // Faz a autenticação
        const responseAuth = await request(app).post('/auth').send({
            email: 'usuario@teste.com.br',
            password: '12345678',
        });

        token = responseAuth.body.token;
    });

    it('Deve listar as mensagens do usuário na seção', async () => {
        // Cria uma mensagem
        const responseCreateMessage = await request(app)
            .post('/messages')
            .send({
                description: "mensagem teste",
                details: "mensagem teste"
            })
            .set('Authorization', `Bearer ${token}`);

        const message = responseCreateMessage.body    
    
        // Lista a mensagem criada
        const responseMessageUserSession = await request(app)
            .get(`/messages/user-session`)
            .set('Authorization', `Bearer ${token}`);  
            
        expect(responseMessageUserSession.status).toBe(200);
        expect(responseMessageUserSession.body).toEqual([message]);
    });

    it('Não deve listar a mensagem, quando não houver autenticação', async () => {
        expect(
            request(app)
            .get(`/messages/user-session`)
        ).rejects;
    });
});