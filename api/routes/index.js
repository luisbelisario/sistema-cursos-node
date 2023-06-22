const bodyParser = require('body-parser');
const pessoasRoutes = require('./pessoasRoute');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(pessoasRoutes);
}