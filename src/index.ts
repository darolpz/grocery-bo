import fastify from 'fastify';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/user';
import *  as dotenv from 'dotenv';

dotenv.config();
const server = fastify();
console.log(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_PASS);
createConnection({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: 'grocery',
  entities: [
    User
  ],
  synchronize: true,
  logging: false
}).then(async connection => {

  console.log('Inserting a new user into the database...');
  const user = new User();
  user.firstName = 'Timber';
  user.lastName = 'Saw';
  user.email = 'daropl12@gmail.com';
  await connection.manager.save(user);
  console.log('Saved a new user with id: ' + user.id);

  console.log('Loading users from the database...');
  const users = await connection.manager.find(User);
  console.log('Loaded users: ', users);

  console.log('Here you can setup and run express/koa/any other framework.');

}).catch(error => console.log(error));

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
