const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Caisse d'Entraide API",
        description: 'Members (profile), loans, interest, savings and withdraws'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
