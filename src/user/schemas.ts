import { RouteShorthandOptions } from 'fastify';

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

const updateOpts: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'firstName', 'lastName', 'email'],
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
        email: {
          type: 'string'
        }
      }
    }
  }
};

export { registerOpts, loginOptions, updateOpts };
