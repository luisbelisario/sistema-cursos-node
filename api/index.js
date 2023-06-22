const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => res
    .status(200)
    .send({mensagem: 'Hello Nodemon'})
);

app.listen(port, () => console.log(chalk.green(`Server running on port ${port}`)));

module.exports = app;