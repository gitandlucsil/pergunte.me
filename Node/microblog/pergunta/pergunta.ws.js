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

       //Serviço para listar todas as perguntas feitas por um determinado usuario
       app.route("/pergunta/listar_feitas_usuario").get( (req, resp) => {
        dao.listarPerguntaFeitaUsuario(req.query.usuario, (retorno) => {
           resp.json(retorno)
        })
    })

    //Serviço para o usuario ignorar uma pergunta nao respondida
    app.route('/pergunta/excluir/:id').get( (req, res) => {
        let id = req.params.id
        dao.ignorarPerguntaNaoRespondida(id, () => {
            res.json({})
        })
    })

    //Servico para o usuario enviar a resposta de uma pergunta
    app.route("/pergunta/responder").post((req,resp) => {
        console.log(req.body)
        dao.atualizar(req.body, () => {
            resp.end()
        })
    })

}