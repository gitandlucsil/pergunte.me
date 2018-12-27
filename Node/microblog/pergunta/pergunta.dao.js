const md5 = require('md5');

const db = require('../db/db');
const Pergunta = require('./pergunta.model');
const Usuario = require('../usuario/usuario.model');
const mongoose = require('mongoose');

exports.salvar = (pergunta, fnCallback) => {
    db.connect();
    let u = new Pergunta(pergunta);
    u.save( (e, res) => {
        db.disconnect();
        fnCallback();
    });
}

exports.atualizar = (pergunta, fnCallback) => {
    db.connect();
    pergunta.dataResposta = new Date()
    console.log(pergunta._id)
    console.log(pergunta.descricao)
    console.log(pergunta.resposta)
    console.log(pergunta.dataResposta)
    Pergunta.findByIdAndUpdate(pergunta._id, pergunta, (e, ret) => {
        db.disconnect()
        fnCallback()
    })
}

exports.listarPerguntaRespondidaUsuario = (usuario, fnCallback) => {
    db.connect()
    let q = Pergunta.find({ destinatario : usuario}).where("resposta").ne(null)
    q.sort('-dataResposta')
    q.populate('destinatario')
    q.exec((e, ret) => {
        db.disconnect()
        fnCallback(ret)
    })
}

exports.listarPerguntaPendenteUsuario = (usuario, fnCallback) => {
    db.connect()
    let q = Pergunta.find({ destinatario : usuario}).find({ resposta : null})
    q.sort('-dataPergunta')
    q.populate('remetente')
    q.exec((e, ret) => {
        db.disconnect()
        fnCallback(ret)
    })
}

exports.listarPerguntaFeitaUsuario = (usuario, fnCallback) => {
    db.connect()
    let q = Pergunta.find({ remetente : usuario})
    q.sort('-dataPergunta')
    q.populate('destinatario')
    q.exec((e, ret) => {
        db.disconnect()
        fnCallback(ret)
    })
}

exports.ignorarPerguntaNaoRespondida = (id, fnCallback) => {
    db.connect()
    Pergunta.findByIdAndDelete(id, (e, ret) => {
        db.disconnect()
        fnCallback()
    })
}
