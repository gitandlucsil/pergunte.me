const db = require('../db/db');
const Usuario = require('./usuario.model');

exports.salvar = (usuario, fnCallback) => {
    db.connect();
    let u = new Usuario(usuario);
    u.save( (e, res) => {
        db.disconnect();
        fnCallback();
    });
}

exports.verificar = (id, fnCallback) => {
    db.connect();

    Usuario.findById(id, (e, ret) => {
        fnCallback(ret != null)
    })
}

exports.consultar = (usuario, fnCallback) => {
    db.connect();
    let u = new Usuario(usuario);
    Usuario.findOne( { login : u.login, senha : u.senha }, (e, res) => {
        db.disconnect();
        fnCallback(res);
    });
}

exports.listarUsuarios = (fnCallback) => {
    db.connect()
    Usuario.find( (e, ret) => {
        db.disconnect()
        fnCallback(ret)
    })
}