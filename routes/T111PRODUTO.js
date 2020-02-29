const T111PRODUTO = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';

    // Consultar todos os dados da tabela  
    server.get('/T111PRODUTO', (req, res, next) => {
        knex('T111PRODUTO')
            .where('T111STATUS', 'A')
            .then((dados) => {
                res.send(dados);
            }, next)
            .catch(function (error) {
                res.send(new errs.BadRequestError(error));
            });
    });

    // Consultar ID
    server.get('/T111PRODUTO/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T111PRODUTO', 'T111ID', next);
    });

    //Alterar dados
    server.put('/T111PRODUTO/alteracao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T111PRODUTO', 'T111ID', next);
    });

    //Deletar dados 
    server.del('/T111PRODUTO/exclusao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaExclusao(req, res, next);
        if (error.length == 0)
            comum.DeletarReg(req, res, knex, errs, 'T111PRODUTO', 'T111ID', next);
    });

    //Criar novo registro 
    server.post('/T111PRODUTO/inclusao', (req, res, next) => {
        var error = [];
        comum.ValidaInclusao(req, res, next);
        if (error.length == 0)
            comum.IncluirReg(req, res, knex, errs, 'T111PRODUTO', next);
    });
}

module.exports = T111PRODUTO;