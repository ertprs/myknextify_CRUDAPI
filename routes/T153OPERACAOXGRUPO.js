const T153OPERACAOXGRUPO = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';

    // Consultar todos os dados da tabela  
    server.get('/T153OPERACAOXGRUPO', (req, res, next) => {
        knex('T153OPERACAOXGRUPO')
            .where('T111STATUS', 'A')
            .then((dados) => {
                res.send(dados);
            }, next)
            .catch(function (error) {
                res.send(new errs.BadRequestError(error));
            });
    });

    // Consultar ID
    server.get('/T153OPERACAOXGRUPO/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T153OPERACAOXGRUPO', 'T153ID', next);
    });

    //Alterar dados
    server.put('/T153OPERACAOXGRUPO/alteracao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T153OPERACAOXGRUPO', 'T153ID', next);
    });

    //Deletar dados 
    server.del('/T153OPERACAOXGRUPO/exclusao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaExclusao(req, res, next);
        if (error.length == 0)
            comum.DeletarReg(req, res, knex, errs, 'T153OPERACAOXGRUPO', 'T153ID', next);
    });

    //Criar novo registro 
    server.post('/T153OPERACAOXGRUPO/inclusao', (req, res, next) => {
        var error = [];
        comum.ValidaInclusao(req, res, next);
        if (error.length == 0)
            comum.IncluirReg(req, res, knex, errs, 'T153OPERACAOXGRUPO', next);
    });
}

module.exports = T153OPERACAOXGRUPO;