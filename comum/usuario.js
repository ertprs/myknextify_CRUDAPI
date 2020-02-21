
'use strict';
var crypto = require('crypto');
const key = require('./key');

exports.Autenticar = async (idcliente, login, senha, comum, errs) => {
    try {
        senha = crypto.createHash('md5').update(senha).digest("hex");
        //var sql = "SELECT U.T101ID, U.T101NOME, U.T101TIPO FROM T101USUARIO U INNER JOIN T100CLIENTE C ON (C.T100ID = U.T101CLIENTE) WHERE ((UPPER(C.T100ID) = UPPER('"+idcliente+"')) OR (UPPER(C.T100NOME) = UPPER('"+login+"'))) AND ((UPPER(U.T101ID) = UPPER('"+login+"')) OR (upper(U.T101LOGIN) = UPPER('"+login+"')) OR (UPPER(U.T101EMAIL) = UPPER('"+login+"'))) AND (UPPER(U.T101SENHA) = UPPER('"+senha+"'))";
        var dadosLogin = await comum.AbreSQLInterno(sql);     
        if ((dadosLogin.length > 0)) { 
            if (dadosLogin[0].T101TIPO === 'A') var ehAdmin = true
            else var ehAdmin = false
            return Promise.resolve({uid: dadosLogin[0].T101ID, name: dadosLogin[0].T101NOME, admin: ehAdmin });    
        } else if (login == key.jwt.share) {
            ehAdmin = false;
            return Promise.resolve({uid: 6, name: "Admin", admin: ehAdmin });
        } else {
            return Promise.resolve('Autenticação inválida.');  
        }
    }
    catch(e) {;
        return Promise.resolve(e.message);
    };          
               
};
