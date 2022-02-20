import request from 'supertest';
import { app } from "../../../../../src/core/presentation/http/main";
import { v4 as uuidv4 } from 'uuid';

let token: string;
let messageId: string;

describe('DeleteMessageController', () => {
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

        const responseMessage = await request(app)
            .post('/messages')
            .send({
                description: "mensagem teste",
                details: "mensagem teste"
            })
            .set('Authorization', `Bearer ${token}`);

        messageId = responseMessage.body.id; 
    });

    it('Estando autenticado, deve excluir uma mensagem', async () => {
        const response = await request(app)
            .delete(`/messages/${messageId}`)    
            .set('Authorization', `Bearer ${token}`);

        const messageUpdated = response.body;    
            
        expect(response.status).toBe(200);
    });

    it('Não deve excluir, quando não houver autenticação', async () => {
        expect(
            request(app)
            .delete(`/messages/${messageId}`)
        ).rejects;
    });

    it('Não deve excluir, uma mensagem que não existe', async () => {
        expect(
            request(app)
            .delete(`/messages/${uuidv4()}`)
        ).rejects;
    });
});