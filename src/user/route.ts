import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
import { User } from './model';
import UserService from './service';

const registerOpts: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'firstName', 'lastName', 'password', 'email'],
      properties: {
        username: {
          type: 'string'
        },
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
        email: {
          type: 'string'
        }
      }
    }
  }
};

const loginOptions: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    }
  }
};

const userService = new UserService;
function registerUserRoutes(server: FastifyInstance) {
  server.post('/register', registerOpts, register);
  server.post('/login', loginOptions, login);
  server.put('/user/update', registerOpts, update);
}

async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body: User = <User>request.body;
    const user = await userService.register(body);
    console.log(user);
    reply.code(200).type('application/json').send(user);
  } catch (err) {
    reply.code(400).type('application/json').send(err);
  }
}

async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = <any>request.body;
    const user = await userService.login(body.username, body.password);
    reply.code(200).type('application/json').send(user);
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

async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body: User = <User>request.body;
    const user = await userService.update(body);
    reply.code(200).type('application/json').send(user);
  } catch (err) {
    reply.code(400).type('application/json').send(err);
  }
}
export default registerUserRoutes;
