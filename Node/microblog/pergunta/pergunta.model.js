const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

var schemaPost = new Schema({
    descricao : String,
    dataPergunta : Date,
    dataReposta : Date,
    remetente : {
        type : Types.ObjectId,
        ref : 'Usuario'
    },
    destinatario : {
        type : Types.ObjectId,
        ref : 'Usuario'
    },
    reposta : String

});

module.exports = mongoose.model("Post", schemaPost);