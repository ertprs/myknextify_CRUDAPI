const T115CAMPOSLISTA = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';

    // Consultar todos os dados da tabela  
    server.get('/T115CAMPOSLISTA', (req, res, next) => {
        knex('T115CAMPOSLISTA')
            .where('T103STATUS', 'A')
            .then((dados) => {
                res.send(dados);
            }, next)
            .catch(function (error) {
                res.send(new errs.BadRequestError(error));
            });
    });

    // Consultar ID
    server.get('/T115CAMPOSLISTA/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T115CAMPOSLISTA', 'T115ID', next);
    });

    //Alterar dados
    server.put('/T115CAMPOSLISTA/alteracao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T115CAMPOSLISTA', 'T115ID', next);
    });

    //Deletar dados 
    server.del('/T115CAMPOSLISTA/exclusao/:id', (req, res, next) => {
        var error = [];
        comum.ValidaExclusao(req, res, next);
        if (error.length == 0)
            comum.DeletarReg(req, res, knex, errs, 'T115CAMPOSLISTA', 'T115ID', next);
    });

    //Criar novo registro 
    server.post('/T115CAMPOSLISTA/inclusao', (req, res, next) => {
        var error = [];
        comum.ValidaInclusao(req, res, next);
        if (error.length == 0)
            comum.IncluirReg(req, res, knex, errs, 'T115CAMPOSLISTA', next);
    });

    // Retorna Lista
    server.get('/T115CAMPOSLISTA/retornalista/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        const { id } = req.params;
        if (error.length == 0) {
            sSql = 'SELECT T114VALOR FROM T115CAMPOSLISTA WHERE T115ID = ' + id;
            comum.RetornaLista(sSql, res);
        }
    });
}

module.exports = T115CAMPOSLISTA;