const md5 = require('md5');

const db = require('../db/db');
const Post = require('./post.model');
const Usuario = require('../usuario/usuario.model');
const mongoose = require('mongoose');

exports.salvar = (post, fnCallback) => {
    db.connect();

    let p = new Post(post);
    p.data = new Date()

    p.save( (e, res) => {
        db.disconnect();
        fnCallback();
    });
}

exports.listar = (usuario, fnCallback) => {
    db.connect()
    let q = Post.find({ usuario : usuario})
    q.sort('-data')
    q.exec((e, ret) => {
        db.disconnect()
        fnCallback(ret)
    })
}