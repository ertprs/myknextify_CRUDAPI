const restify = require('restify'),
    https = require('restify-https');
const errs = require('restify-errors');
const corsMiddleware = require('restify-cors-middleware');
const fs = require('fs');
const bodyParser = require('body-parser');
const validationContract = require('../validator/validator');
const comum = require('../comum/comum');
const usuario = require('../comum/usuario');
const config = require('../comum/config');

//Criando servidor Restify
const server = restify.createServer({
    name: 'apiSearchCLoud',
    version: '1.0.0'
});


//Utilizando CORS, https, plugins restify, body-parser e query-parser
var cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['*', 'Authorization'],
    exposeHeaders: []
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(https({ override: false }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser({
    mapParams: true,
    mapFiles: false,
    overrideParams: false
}));

server.use(restify.plugins.queryParser());

//Utilizar porta padrão
const port = normalizePort(global.PORT);
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
}

//Subindo servidor na porta padrão
server.listen(port, function () {
    console.log('EasyCopy Api Online - Porta: %s Ambiente: %s', process.env.PORT, process.env.NODE_ENV);
    console.log('Host Mysql: %s Banco: %s', global.mySQLhost, global.mySQLdatabase);
});

//Instanciando knex para CRUDs
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: global.mySQLhost,
        user: global.mySQLuser,
        password: global.mySQLpassword,
        database: global.mySQLdatabase,
        acquireConnectionTimeout: 200000,
        log: {
            warn(message) {
            },
            error(message) {
            },
            deprecate(message) {
            },
            debug(message) {
            },
        }
    }
});

//URL principal
server.get('/', function (req, res, next) {
    res.send('EasyCopy Api Online!');
});

//auth
/*
auth = require('../comum/auth');
auth(server, comum, usuario, validationContract, errs); */

//T100FRANQUEADO.js
t100franqueado = require('../routes/T100FRANQUEADO');
t100franqueado(server, knex, errs, comum);

//T101CLIENTE.js
t100cliente = require('../routes/T101CLIENTE');
t100cliente(server, knex, errs, comum);

//T103USUARIO.js
t103usuario = require('../routes/T103USUARIO');
t103usuario(server, knex, errs, comum);

//T110CATEGORIAPRODUTO.js
T110CATEGORIAPRODUTO = require('../routes/T110CATEGORIAPRODUTO');
T110CATEGORIAPRODUTO(server, knex, errs, comum);

//T111PRODUTO.js
T111PRODUTO = require('../routes/T111PRODUTO');
T111PRODUTO(server, knex, errs, comum);

//T150GRUPOOPERACAO.js
T150GRUPOOPERACAO = require('../routes/T150GRUPOOPERACAO');
T150GRUPOOPERACAO(server, knex, errs, comum);

//T151OPERACAO.js
T151OPERACAO = require('../routes/T151OPERACAO');
T151OPERACAO(server, knex, errs, comum);

//T153OPERACAOXGRUPO.js
T153OPERACAOXGRUPO = require('../routes/T153OPERACAOXGRUPO');
T153OPERACAOXGRUPO(server, knex, errs, comum);

//T113CAMPOPERSONALIZADOPROD.js
T113CAMPOPERSONALIZADOPROD = require('../routes/T113CAMPOPERSONALIZADOPROD');
T113CAMPOPERSONALIZADOPROD(server, knex, errs, comum);

//T114LISTACAMPO.js
T114LISTACAMPO = require('../routes/T114LISTACAMPO');
T114LISTACAMPO(server, knex, errs, comum);

//T115CAMPOSLISTA.js
T115CAMPOSLISTA = require('../routes/T115CAMPOSLISTA');
T115CAMPOSLISTA(server, knex, errs, comum);

//mylib
mylib = require('../comum/mylib');
mylib(server, comum);


module.exports = server;

