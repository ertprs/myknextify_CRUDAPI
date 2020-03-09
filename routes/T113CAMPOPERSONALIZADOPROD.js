const T113CAMPOPERSONALIZADOPROD = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';

    // Consultar todos os dados da tabela  
    server.get('/T113CAMPOPERSONALIZADOPROD', (req, res, next) => {
        knex('T113CAMPOPERSONALIZADOPROD')
            .where('T103STATUS', 'A')
            .then((dados) => {
                res.send(dados);
            }, next)
            .catch(function (error) {
                res.send(new errs.BadRequestError(error));
            });
    });

    // Consultar ID
    server.get('/T113CAMPOPERSONALIZADOPROD/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T113CAMPOPERSONALIZADOPROD', 'T113ID', next);
    });

    //Alterar dados
    server.put('/T113CAMPOPERSONALIZADOPROD/alteracao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T113CAMPOPERSONALIZADOPROD', 'T113ID', next);
    });

    //Deletar dados 
    server.del('/T113CAMPOPERSONALIZADOPROD/exclusao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaExclusao(req, res, next);
        if (error.length == 0)
            comum.DeletarReg(req, res, knex, errs, 'T113CAMPOPERSONALIZADOPROD', 'T113ID', next);
    });

    //Criar novo registro 
    server.post('/T113CAMPOPERSONALIZADOPROD/inclusao', (req, res, next) => {
        var error = [];
        comum.ValidaInclusao(req, res, next);
        if (error.length == 0)
            comum.IncluirReg(req, res, knex, errs, 'T113CAMPOPERSONALIZADOPROD', next);
    });

    // Retorna Lista
    server.get('/T113CAMPOPERSONALIZADOPROD/retornalista/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        const { id } = req.params;
        if (error.length == 0) {
            sSql = 'SELECT T114VALOR FROM T113CAMPOPERSONALIZADOPROD WHERE T113ID = ' + id;
            comum.RetornaLista(sSql, res);
        }
    });
}

module.exports = T113CAMPOPERSONALIZADOPROD;