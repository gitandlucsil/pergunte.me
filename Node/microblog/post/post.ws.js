const dao = require('./post.dao')

module.exports = (app) => {

    app.route("/post/listar").get( (req, resp) => {
        dao.listar(req.query.usuario, (retorno) => {
            resp.json(retorno)
        })
    })

    app.route("/post/salvar").post( (req, resp) => {
        dao.salvar(req.body, () => {
            resp.end()
        })
    })
}