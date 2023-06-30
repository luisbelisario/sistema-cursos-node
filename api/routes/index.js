const bodyParser = require('body-parser');
const pessoasRoutes = require('./pessoasRoute');
const niveisRoutes = require('./niveisRoute')
const turmasRoutes = require('./turmasRoute')

module.exports = app => {
    app.use(bodyParser.json());
    app.use(pessoasRoutes);
    app.use(niveisRoutes);
    app.use(turmasRoutes);
}