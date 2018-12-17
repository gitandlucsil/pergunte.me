const dao = require('./usuario.dao')

module.exports = (app) => {

    app.route("/usuario/login").post( (req, resp) => {
        dao.consultar(req.body, (result) => {
            resp.json(result)
        })
    })

    app.route("/usuario/salvar").post( (req, resp) => {
        dao.salvar(req.body, () => {
            resp.end()
        })
    })

}