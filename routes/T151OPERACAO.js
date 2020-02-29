const T151OPERACAO = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';

    // Consultar todos os dados da tabela  
    server.get('/T151OPERACAO', (req, res, next) => {
        knex('T151OPERACAO')
            .where('T111STATUS', 'A')
            .then((dados) => {
                res.send(dados);
            }, next)
            .catch(function (error) {
                res.send(new errs.BadRequestError(error));
            });
    });

    // Consultar ID
    server.get('/T151OPERACAO/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T151OPERACAO', 'T151ID', next);
    });

    //Alterar dados
    server.put('/T151OPERACAO/alteracao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T151OPERACAO', 'T151ID', next);
    });

    //Deletar dados 
    server.del('/T151OPERACAO/exclusao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaExclusao(req, res, next);
        if (error.length == 0)
            comum.DeletarReg(req, res, knex, errs, 'T151OPERACAO', 'T151ID', next);
    });

    //Criar novo registro 
    server.post('/T151OPERACAO/inclusao', (req, res, next) => {
        var error = [];
        comum.ValidaInclusao(req, res, next);
        if (error.length == 0)
            comum.IncluirReg(req, res, knex, errs, 'T151OPERACAO', next);
    });
}

module.exports = T151OPERACAO;