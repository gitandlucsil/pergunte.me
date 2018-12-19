const dao = require('./pergunta.dao')

module.exports = (app) => {

    app.route("/inbox").get((req, resp) => {
        dao.listar(req.query.destinatario, (retorno) =>{
            resp.json(retorno)
        })
    })

    app.route("/pergunta/listar").get( (req, resp) => {
        dao.listar(req.query.usuario, (retorno) => {
            resp.json(retorno)
        })
    })

    app.route("/pergunta/salvar").post( (req, resp) => {
        dao.salvar(req.body, () => {
            resp.end()
        })
    })
}