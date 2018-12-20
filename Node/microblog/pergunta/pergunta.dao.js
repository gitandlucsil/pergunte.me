const md5 = require('md5');

const db = require('../db/db');
const Pergunta = require('./pergunta.model');
const Usuario = require('../usuario/usuario.model');
const mongoose = require('mongoose');

exports.salvar = (pergunta, fnCallback) => {
    db.connect();

    let p = new Pergunta(pergunta);
    p.data = new Date()

    p.save( (e, res) => {
        db.disconnect();
        fnCallback();
    });
}

exports.listarPerguntaRespondidaUsuario = (usuario, fnCallback) => {
    db.connect()
    let q = Pergunta.find({ destinatario : usuario}).where("resposta").ne(null)
    q.sort('-dataResposta')
    q.exec((e, ret) => {
        db.disconnect()
        fnCallback(ret)
    })
}

exports.listarPerguntaPendenteUsuario = (usuario, fnCallback) => {
    db.connect()
    let q = Pergunta.find({ destinatario : usuario}).find({ resposta : null})
    q.sort('-dataPergunta')
    q.exec((e, ret) => {
        db.disconnect()
        fnCallback(ret)
    })
}