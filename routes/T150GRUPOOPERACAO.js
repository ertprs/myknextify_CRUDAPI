const T150GRUPOOPERACAO = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';

    // Consultar todos os dados da tabela  
    server.get('/T150GRUPOOPERACAO', (req, res, next) => {
        knex('T150GRUPOOPERACAO')
            .where('T111STATUS', 'A')
            .then((dados) => {
                res.send(dados);
            }, next)
            .catch(function (error) {
                res.send(new errs.BadRequestError(error));
            });
    });

    // Consultar ID
    server.get('/T150GRUPOOPERACAO/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T150GRUPOOPERACAO', 'T150ID', next);
    });

    //Alterar dados
    server.put('/T150GRUPOOPERACAO/alteracao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T150GRUPOOPERACAO', 'T150ID', next);
    });

    //Deletar dados 
    server.del('/T150GRUPOOPERACAO/exclusao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaExclusao(req, res, next);
        if (error.length == 0)
            comum.DeletarReg(req, res, knex, errs, 'T150GRUPOOPERACAO', 'T150ID', next);
    });

    //Criar novo registro 
    server.post('/T150GRUPOOPERACAO/inclusao', (req, res, next) => {
        var error = [];
        comum.ValidaInclusao(req, res, next);
        if (error.length == 0)
            comum.IncluirReg(req, res, knex, errs, 'T150GRUPOOPERACAO', next);
    });
}

module.exports = T150GRUPOOPERACAO;