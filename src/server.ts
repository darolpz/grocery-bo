import fastify, { FastifyReply } from 'fastify';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Client } from './client/model';
import { Order } from './order/model';
import { OrderToProduct } from './orderToProduct/model';
import { Product } from './product/model';
import { User } from './user/model';
import registerUserRoutes from './user/route';
import { isLocalEnvironment } from './util/environment';

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

  _createConnection();

  server.get('/ping', {}, async (request, reply) => {
    reply.send('pong').code(200);
  });

  registerUserRoutes(server);
  return server;
}

async function _createConnection() {

  if (isLocalEnvironment()) {
    await createConnection({
      type: 'mysql',
      url: process.env.DATABASE_URL_MYSQL,
      database: 'grocery',
      entities: [User, Client, Order, Product, OrderToProduct],
      synchronize: true,
      logging: false
    });
    return;
  }
  await createConnection({
    type: 'postgres',
    ssl: true,
    url: process.env.DATABASE_URL,
    database: 'grocery',
    entities: [User, Client, Order, Product, OrderToProduct],
    synchronize: true,
    logging: false
  });
}

export default server;
