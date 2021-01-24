import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJWT from 'fastify-jwt';
import { User } from './model';
import { loginOptions, registerOpts, updateOpts } from './schemas';
import UserService from './service';

const userService = new UserService;
function registerUserRoutes(server: any) {
  server.post('/register', registerOpts, register);
  server.post('/login', loginOptions, login);
  server.put('/user/update', { preValidation: server.authenticate, ...updateOpts }, update);
}

async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body: User = <User>request.body;
    const user = await userService.register(body);
    reply.code(200).type('application/json').send(user);
  } catch (err) {
    reply.code(400).type('application/json').send(err);
  }
}

async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = <any>request.body;
    const user = await userService.login(body.username, body.password);
    const token = await reply.jwtSign({ ...user });
    reply.code(200).type('application/json').send(token);
  } catch (err) {
    let code = 400;
    if (err === userService.notAuthorizedError) {
      code = 401;
    }
    if (err === userService.userNotFoundError) {
      code = 404;
    }
    reply.code(code).type('application/json').send(err);
  }
}

async function update(request: any, reply: FastifyReply, server: any) {
  try {
    const body: User = <User>request.body;
    const user = await userService.update(request.user.id, body);
    reply.code(200).type('application/json').send(user);
  } catch (err) {
    reply.code(400).type('application/json').send(err);
  }

}
export default registerUserRoutes;
