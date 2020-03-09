const T114LISTACAMPO = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';

    // Consultar todos os dados da tabela  
    server.get('/T114LISTACAMPO', (req, res, next) => {
        knex('T114LISTACAMPO')
            .where('T103STATUS', 'A')
            .then((dados) => {
                res.send(dados);
            }, next)
            .catch(function (error) {
                res.send(new errs.BadRequestError(error));
            });
    });

    // Consultar ID
    server.get('/T114LISTACAMPO/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T114LISTACAMPO', 'T114ID', next);
    });

    //Alterar dados
    server.put('/T114LISTACAMPO/alteracao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T114LISTACAMPO', 'T114ID', next);
    });

    //Deletar dados 
    server.del('/T114LISTACAMPO/exclusao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaExclusao(req, res, next);
        if (error.length == 0)
            comum.DeletarReg(req, res, knex, errs, 'T114LISTACAMPO', 'T114ID', next);
    });

    //Criar novo registro 
    server.post('/T114LISTACAMPO/inclusao', (req, res, next) => {
        var error = [];
        comum.ValidaInclusao(req, res, next);
        if (error.length == 0)
            comum.IncluirReg(req, res, knex, errs, 'T114LISTACAMPO', next);
    });

    // Retorna Lista
    server.get('/T114LISTACAMPO/retornalista/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        const { id } = req.params;
        if (error.length == 0) {
            sSql = 'SELECT T114VALOR FROM T114LISTACAMPO WHERE T114ID = ' + id;
            comum.RetornaLista(sSql, res);
        }
    });
}

module.exports = T114LISTACAMPO;