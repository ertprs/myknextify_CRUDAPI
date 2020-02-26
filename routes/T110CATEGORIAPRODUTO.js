const T110CATEGORIAPRODUTO = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';

    // Consultar todos os dados da tabela  
    server.get('/T110CATEGORIAPRODUTO', (req, res, next) => {
        knex('T110CATEGORIAPRODUTO')
            .where('T110STATUS', 'A')
            .then((dados) => {
                res.send(dados);
            }, next)
            .catch(function (error) {
                res.send(new errs.BadRequestError(error));
            });
    });

    // Consultar ID
    server.get('/T110CATEGORIAPRODUTO/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T110CATEGORIAPRODUTO', 'T110ID', next);
    });

    //Alterar dados
    server.put('/T110CATEGORIAPRODUTO/alteracao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T110CATEGORIAPRODUTO', 'T110ID', next);
    });

    //Deletar dados 
    server.del('/T110CATEGORIAPRODUTO/exclusao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaExclusao(req, res, next);
        if (error.length == 0)
            comum.DeletarReg(req, res, knex, errs, 'T110CATEGORIAPRODUTO', 'T110ID', next);
    });

    //Criar novo registro 
    server.post('/T110CATEGORIAPRODUTO/inclusao', (req, res, next) => {
        var error = [];
        comum.ValidaInclusao(req, res, next);
        if (error.length == 0)
            comum.IncluirReg(req, res, knex, errs, 'T110CATEGORIAPRODUTO', next);
    });
}

module.exports = T110CATEGORIAPRODUTO;