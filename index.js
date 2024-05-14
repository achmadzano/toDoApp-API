if (!process.env.ENV) {
    require('dotenv').config();
}

const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3001;

const swaggerDoc = require('./swagger/swagger.json');
const definitionsDoc = require('./swagger/swagger-definitions.json');
const parametersDoc = require('./swagger/swagger-parameters.json');
const authDoc = require('./swagger/swagger-auth.json');
const listDoc = require('./swagger/swagger-list.json');

Object.assign(
    swaggerDoc.paths,
    parametersDoc.paths,
    authDoc.paths,
    listDoc.paths
  );
  
  Object.assign(
    swaggerDoc.components,
    definitionsDoc.components
  );
  
  // modify swagger path on dev and prod
  switch (process.env.ENV) {
    case 'DEV':
      for (const i in swaggerDoc.paths) {
        delete Object.assign(swaggerDoc.paths, {
          [i]: swaggerDoc.paths[i]
        })[i];
      }
      break;
    case 'PROD':
      for (const i in swaggerDoc.paths) {
        delete Object.assign(swaggerDoc.paths, {
          [`/ats-prod${i}`]: swaggerDoc.paths[i]
        })[i];
      }
  }
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const apiV1 = require('./api/v1/routing');
app.use('/api/v1', apiV1);

let hostname;
if (process.env.VCAP_APPLICATION) {
  const vcap = JSON.parse(process.env.VCAP_APPLICATION);
  hostname = 'https://' + vcap.application_uris[0];
} else {
  hostname = `http://localhost:${port}/api-docs`;
}

app.listen(port, () => {
  console.log('Listening at ' + hostname);
});

module.exports = app;
