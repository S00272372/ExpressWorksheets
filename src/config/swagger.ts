
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car API',
      version: '1.0.0',
      description: 'REST API for managing cars'
    },
    
components: {
  securitySchemes: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key',
      description: 'API key required for protected endpoints'
    }
  },
  schemas: {
    Car: {
      type: 'object',
      required: ['make', 'model'],
      properties: {
        make: {
          type: 'string',
          example: 'Toyota'
        },
        model: {
          type: 'string',
          example: 'Corolla'
        },
        year: {
          type: 'integer',
          example: 2022
        }
      }
    },
    Error: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Car not found'
        }
      }
    }
  }
},

    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local development server'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);
