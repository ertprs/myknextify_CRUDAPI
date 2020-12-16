global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo ao Easy Copy!';
global.ambiente = process.env.NODE_ENV;
global.PORT = process.env.PORT;
if (ambiente == 'production') {
    global.mySQLhost = '';
    global.mySQLuser = '';
    global.mySQLpassword = '';
    global.mySQLdatabase = '';
    global.mySQLport = '';
    global.urlSite = '';
    global.urlApi = '';
    global.tokenAPI = '';
} else if (ambiente == 'development') {
    global.mySQLhost = '';
    global.mySQLuser = '';
    global.mySQLpassword = '';
    global.mySQLdatabase = '';
    global.mySQLport = '';
    global.urlSite = '';
    global.urlApi = '';
    global.tokenAPI = '';
}
module.exports = {
    versao: 0.01
}