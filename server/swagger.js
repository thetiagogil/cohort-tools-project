const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // This can be updated to the desired version.
    info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
    },
    servers: [
        {
          url: "http://localhost:5005",
        },
      ],
  },
  // List of files to be processed
  apis: ['./*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
