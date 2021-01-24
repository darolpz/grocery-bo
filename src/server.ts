import fastify, { FastifyReply } from 'fastify';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Client } from './client/model';
import { Order } from './order/model';
import { OrderToProduct } from './orderToProduct/model';
import { Product } from './product/model';
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
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'grocery',
    entities: [User, Client, Order, Product, OrderToProduct],
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
