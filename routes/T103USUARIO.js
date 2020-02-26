const t103usuario = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';
    
    // Consultar todos os dados da tabela  
    server.get('/T103USUARIO', (req, res, next) => {  
        knex('T103USUARIO')
        .where('T103STATUS', 'A')
        .then((dados) => {
            res.send(dados); 
        }, next)
        .catch(function(error) {
            res.send(new errs.BadRequestError(error));
        });   
    });

    // Consultar ID
    server.get('/T103USUARIO/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T103USUARIO', 'T103ID', next);     
    }); 

    //Alterar dados
    server.put('/T103USUARIO/alteracao/:id', (req, res, next) => { 
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T103USUARIO', 'T103ID', next);               
    });
  
    //Deletar dados 
    server.del('/T103USUARIO/exclusao/:id', (req, res, next) => {  
        var error = []; 
        comum.ValidaExclusao(req, res, next); 
        if (error.length == 0)   
            comum.DeletarReg(req, res, knex, errs, 'T103USUARIO', 'T103ID', next);    
    });
  
    //Criar novo registro 
    server.post('/T103USUARIO/inclusao', (req, res, next) => {
        var error = [];   
        comum.ValidaInclusao(req, res, next); 
        if (error.length == 0) 
            comum.IncluirReg(req, res, knex, errs, 'T103USUARIO', next); 
    });          
}

module.exports = t103usuario;