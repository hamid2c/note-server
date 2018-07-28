"use strict";

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser');

const portNumber = 3000;

const router = express.Router();

router.route('/notes').get(function(req, res, next) {
    res.json("that's all you get for now!");
});

//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

console.log("Note Server is running on port " + portNumber);
app.listen(portNumber);