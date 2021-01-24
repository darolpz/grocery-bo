import fastify, { FastifyReply } from 'fastify';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './user/model';
import registerUserRoutes from './user/route';

async function server() {
  const server = fastify();
  server.register(require('fastify-jwt'), {
    secret: process.env.SECRET
  });

  server.decorate('authenticate', async (request: any, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  await createConnection({
    name: 'default',
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'grocery',
    entities: [User],
    synchronize: true,
    logging: false
  });

  server.get('/ping', {}, async (request, reply) => {
    reply.send('pong').code(200);
  });

  registerUserRoutes(server);
  return server;
}

export default server;