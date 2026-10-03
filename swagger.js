const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Caisse d'Entraide API",
        description: 'Members (profile), loans, interest, savings and withdraws. Every data route needs a login: open /login in the browser, sign in with GitHub, then come back to this page and use Try it out.'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
