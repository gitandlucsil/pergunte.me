const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

var schemaPost = new Schema({
    conteudo : String,
    data : Date,
    usuario : {
        type : Types.ObjectId,
        ref : 'Usuario'
    }
});

module.exports = mongoose.model("Post", schemaPost);