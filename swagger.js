const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Caisse d'Entraide API",
<<<<<<< HEAD
        description: 'Members (profile), loans, interest, savings and withdraws. Every data route needs a login: open /login in the browser, sign in with GitHub, then come back to this page and use Try it out.'
=======
        description: 'Members (profile), loans, interest, savings and withdraws'
>>>>>>> ed1362fee85a5422402f6169b89962c07f12bf7f
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
