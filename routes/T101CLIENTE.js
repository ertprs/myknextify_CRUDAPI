const t101cliente = (server, knex, errs, comum) => {
    var dados = [];
    var resultado = '';
    
    // Consultar todos os dados da tabela  
    server.get('/T101CLIENTE', (req, res, next) => {  
        knex('T101CLIENTE')
        .where('T101STATUS', 'A')
        .then((dados) => {
            res.send(dados); 
        }, next)
        .catch(function(error) {
            res.send(new errs.BadRequestError(error));
        });   
    });

    // Consultar ID
    server.get('/T101CLIENTE/consulta/:id', (req, res, next) => {
        var error = [];
        comum.ValidaConsulta(req, res, error);
        if (error.length == 0)
            comum.ConsultarReg(req, res, knex, errs, 'T101CLIENTE', 'T101ID', next);     
    }); 

    //Alterar dados
    server.put('/T101CLIENTE/alteracao/:id', (req, res, next) => { 
        var error = [];
        comum.ValidaAlteracao(req, res, next);
        if (error.length == 0)
            comum.AlterarReg(req, res, knex, errs, 'T101CLIENTE', 'T101ID', next);               
    });
  
    //Deletar dados 
    server.del('/T101CLIENTE/exclusao/:id', (req, res, next) => {  
        var error = []; 
        comum.ValidaExclusao(req, res, next); 
        if (error.length == 0)   
            comum.DeletarReg(req, res, knex, errs, 'T101CLIENTE', 'T101ID', next);    
    });
  
    //Criar novo registro 
    server.post('/T101CLIENTE/inclusao', (req, res, next) => {
        var error = [];   
        comum.ValidaInclusao(req, res, next); 
        if (error.length == 0) 
            comum.IncluirReg(req, res, knex, errs, 'T101CLIENTE', next); 
    });          
}

module.exports = t101cliente;