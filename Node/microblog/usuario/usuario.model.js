const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var schemaUsuario = new Schema({
    login : String,
    senha : String,
    nome : String,
    bio : String,
    email: String,
    foto: String
});

module.exports = mongoose.model("Usuario", schemaUsuario);