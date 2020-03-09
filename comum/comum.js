const mysql = require('mysql');
const validationContract = require('../validator/validator');
const errs = require('restify-errors');
const { StringDecoder } = require('string_decoder');
const nodemailer = require('nodemailer');
const error = [];

exports.BlobAsText = (valBlob) => {
    try {
        if (!valBlob) {
            return '';
        } else {
            const decoder = new StringDecoder('utf8');
            return decoder.end(Buffer.from(valBlob));
        }
    } catch (error) {
        return (new errs.BadRequestError(error));
    }
}


exports.dataAtualFormatada = () => {
    var data = new Date();
    var dia = data.getDate().toString().padStart(2, '0');
    var mes = (data.getMonth() + 1).toString().padStart(2, '0');
    var ano = data.getFullYear();
    var hora = data.getHours().toString().padStart(2, '0');
    var minutos = data.getMinutes().toString().padStart(2, '0');
    var segundos = data.getSeconds().toString().padStart(2, '0');
    return (dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minutos + ':' + segundos);
}

exports.ValidaConsulta = (req, res, error) => {
    let contract = new validationContract();
    contract.isNumber(req.params.id, 'A requisição deve conter parâmetro(s) de entrada.');
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.send(contract.errors());
        error = contract.errors();
        contract.clear;
        return next();
    }
}

exports.ValidaAlteracao = (req, res, error) => {
    let contract = new validationContract();
    contract.isNumber(req.params.id, 'A requisição deve conter parâmetro(s) de entrada.');
    contract.isRequired(req.body, 'A requisição deve conter um conteúdo JSON.');
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.send(contract.errors());
        error = contract.errors();
        contract.clear;
        return next();
    }
}

exports.ValidaExclusao = (req, res, error) => {
    let contract = new validationContract();
    contract.isNumber(req.params.id, 'A requisição deve conter parâmetro(s) de entrada.');
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.send(contract.errors());
        error = contract.errors();
        contract.clear;
        return next();
    }
}

exports.ValidaInclusao = (req, res, error) => {
    let contract = new validationContract();
    contract.isRequired(req.body, 'A requisição deve conter um conteúdo JSON.');
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.send(contract.errors());
        error = contract.errors();
        contract.clear;
        return next();
    }
}

exports.ConsultarReg = (req, res, knex, errs, tabela, chave, next) => {
    const { id } = req.params;
    //LOG
    var DataAgora = this.dataAtualFormatada();
    console.log('Consulta: ' + tabela + ' Chave: ' + chave + ' Valor: ' + id + ' ' + DataAgora);
    knex(tabela)
        .where(chave, id)
        .then((dados) => {
            if (!dados) res.send(new errs.NotFoundError('Nenhum registro encontrado'))
            else {
                //Retornando Dados
                res.send(dados);
            }
        }, next)
        .catch(function (error) {
            res.send(new errs.BadRequestError(error));
        });
}

exports.AlterarReg = (req, res, knex, errs, tabela, chave, next) => {
    const { id } = req.params;
    var dados = req.body;
    //LOG
    var DataAgora = this.dataAtualFormatada();
    console.log('Alteracao: ' + tabela + ' Chave: ' + chave + ' Valor: ' + id + ' ' + DataAgora);
    //Alteração
    knex(tabela)
        .where(chave, id)
        .update(dados)
        .then((dados) => {
            if (!dados) res.send(new errs.NotFoundError('Nenhum registro encontrado'))
            else {
                resultado = '{"retorno": "' + dados + '", "message": "Registro alterado com sucesso"}';
                obj = JSON.parse(resultado);
                res.send(obj);
            }
        }, next)
        .catch(function (error) {
            res.send(new errs.BadRequestError(error));
        });
}

exports.DeletarReg = (req, res, knex, errs, tabela, chave, next) => {
    const { id } = req.params;
    var DataAgora = this.dataAtualFormatada();
    //LOG
    console.log('Exclusao: ' + tabela + ' Chave: ' + chave + ' Valor: ' + id + ' ' + DataAgora);
    knex(tabela)
        .where(chave, id)
        .delete()
        .then((dados) => {
            if (!dados) res.send(new errs.NotFoundError('Nenhum registro encontrado'))
            else {
                resultado = '{"retorno": "' + dados + '", "msg": "Registro removido com sucesso"}';
                obj = JSON.parse(resultado);
                res.send(obj);
            }
        }, next)
        .catch(function (error) {
            res.send(new errs.BadRequestError(error));
        });
}

exports.IncluirReg = (req, res, knex, errs, tabela, next) => {
    var DataAgora = this.dataAtualFormatada();
    console.log('Inclusao: ' + tabela + ' ' + DataAgora);
    var dados = req.body;
    var resultado = '';
    knex(tabela)
        .insert(dados)
        .then(function (dados) {
            resultado = '{"retorno": "' + dados + '"}';
            obj = JSON.parse(resultado);
            res.send(obj);
        }, next)
        .catch(function (error) {
            res.send(new errs.BadRequestError(error));
        });
}

//Error handler
const errorHandler = (msg, rejectFunction) => {
    console.error(msg);
    rejectFunction({ error: "InternalError", message: msg });
}

exports.AbreSQLInterno = (sqlQuery) => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: global.mySQLhost,
            user: global.mySQLuser,
            password: global.mySQLpassword,
            database: global.mySQLdatabase
        });
        //LOG
        var DataAgora = this.dataAtualFormatada();
        console.log('Abre SQL Interno: ' + DataAgora);
        connection.query({
            sql: sqlQuery,
            timeout: 200000
        }, (err, rows) => {
            try {
                if (err) {
                    connection.end(function (err) { });
                    errorHandler(err, reject);
                    return false;
                } else {
                    connection.end(function (err) { });
                    resolve(rows);
                }
            } catch (error) {
                connection.end(function (err) { });
                errorHandler(error, reject);
                return false;
            }
        });
    });
}

exports.EnviaEmail = (destinatario, assunto, conteudo) => {
    return new Promise((resolve, reject) => {
        let DataAgora = this.dataAtualFormatada();
        console.log('Envio de email: ' + DataAgora);
        //Criar transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.searchcloud.com.br",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "noreply@searchcloud.com.br",
                pass: "A147258abc*"
            },
            tls: { rejectUnauthorized: false }
        });
        //Objeto e-mail
        const email = {
            from: 'EasyCopyMais <noreply@searchcloud.com.br>',
            to: destinatario,
            subject: assunto,
            html: conteudo
        }
        transporter.sendMail(email, (err, result) => {
            if (err) {
                resolve(new errs.BadRequestError(err))
            } else {
                if (result === 'undefined') {
                    resolve(new errs.BadRequestError('Falha ao enviar email.'));
                }
                else {
                    resolve(JSON.parse('{"codigo": 1, "resultado": "Email enviado com sucesso: ' + result.response + '"}'));
                }
            }
        });
    });
}

exports.RetornaLista = (sqlQuery, res) => {
    const connection = mysql.createConnection({
        host: global.mySQLhost,
        user: global.mySQLuser,
        password: global.mySQLpassword,
        database: global.mySQLdatabase
    });
    var DataAgora = this.dataAtualFormatada();
    console.log('Retorna Lista: ' + DataAgora);
    connection.query({
        sql: sqlQuery,
        timeout: 200000
    }, function (err, rows, fields) {
        try {
            if (err) {
                connection.end(function (err) { });
                res.send(new errs.BadRequestError(err))
            } else {
                connection.end(function (err) { });
                if (!rows[0]) {
                    res.send(new errs.NotFoundError('Nenhum registro encontrado'));
                } else {
                    //Verificar se configuração está na Base64 e recuperar
                    const blob64 = require('./blob64');
                    var ehBase64 = 'N';
                    //Blob para textp
                    var strVerific = blob64.BlobAsText(rows[0].T114VALOR);
                    //Verificar se texto está em Base64 e fazer Decode
                    if (blob64.VerificaBase64(strVerific) == true) {
                        rows[0].T114VALOR = blob64.Blob64AsText(rows[0].T114VALOR);
                        ehBase64 = 'S';
                    }
                    //Quebrar lista em Linhas
                    var jsonLista = JSON.stringify(rows[0].T114VALOR);
                    var strLista = '';
                    if (ehBase64 == 'N') {
                        var bufferOriginal = Buffer.from(JSON.parse(jsonLista).data);
                        strLista = bufferOriginal.toString('utf8');
                    } else strLista = rows[0].T114VALOR;
                    var arrayLista = strLista.split(/\n/).map(line => line.trim());
                    var resultado = [];
                    for (var i = 0, l = arrayLista.length; i < l; i++) {
                        resultado.push({ T114VALOR: arrayLista[i] });
                    }
                    res.send(resultado);
                }
            }
        } catch (error) {
            connection.end(function (err) { });
            res.send(new errs.BadRequestError(error));
        }
    });
}