import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';

const opts: RouteShorthandOptions = {

};

function registerUserRoutes(server: FastifyInstance) {
  server.post('/register', opts, register);
}

function register(request: FastifyRequest, reply: FastifyReply) {
  reply.code(200).send(request.body);
}

export default registerUserRoutes;
