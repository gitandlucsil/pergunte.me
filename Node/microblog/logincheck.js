const dao = require('./usuario/usuario.dao')

module.exports = (app) => {

    app.use((req, res, next) => {
        if (req.url.startsWith('/post')) {

            let idUsuario = req.get('Authentication')
            if (idUsuario == null) {
                res.statusCode = 401
                res.statusMessage = 'Não autorizado'
                res.end()
            } else{
                dao.verificar(idUsuario, (ret) => {
                    if (ret) {
                        next()
                    }else {
                        res.statusCode = 401
                        res.statusMessage = 'Não autorizado'
                        res.end()
                    }
                })
            }
        } else {
            next()
        }

    })

}