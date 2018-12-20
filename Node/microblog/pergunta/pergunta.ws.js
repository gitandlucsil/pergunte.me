const dao = require('./pergunta.dao')

module.exports = (app) => {

    app.route("/inbox").get((req, resp) => {
        dao.listar(req.query.destinatario, (retorno) =>{
            resp.json(retorno)
        })
    })

    //Serviço para listar todas as perguntas respondidas por um determinado usuario
    app.route("/pergunta/listar_respondidas_usuario").get( (req, resp) => {
        dao.listarPerguntaRespondidaUsuario(req.query.usuario, (retorno) => {
           resp.json(retorno)
        })
    })

    //Serviço para listar todas as perguntas não respondidas por um determinado usuario
    app.route("/pergunta/listar_pendentes_usuario").get( (req, resp) => {
        dao.listarPerguntaPendenteUsuario(req.query.usuario, (retorno) => {
           resp.json(retorno)
        })
    })

    app.route("/pergunta/salvar").post( (req, resp) => {
        dao.salvar(req.body, () => {
            resp.end()
        })
    })
}