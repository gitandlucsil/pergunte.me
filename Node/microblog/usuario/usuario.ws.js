const dao = require('./usuario.dao')
const multer = require('multer')
const fs = require('fs')

module.exports = (app) => {

    
var nomeArq = ''

    const configMulter = multer.diskStorage(
        {
            destination: (req, res, cb) => {
                cb(null, './uploads')
            }, filename: (req, file, cb) => {
                cb(null, file.originalname)
            }
        }
    )
    app.route("/usuario/login").post((req, resp) => {
        dao.consultar(req.body, (result) => {
            resp.json(result)
        })
    })

    app.route("/usuario/salvar").post((req, resp) => {
        dao.salvar(req.body, () => {
            console.log('Entrei no salvar')
            //console.log(req.body)
            nomeArq = req.body.login
            //console.log(nomeArq)
            resp.end()
        })
    })

    app.post('/usuario/upload64',multer().none(), (req, resp) => {
        let img = req.body.imagem.split(';base64,').pop()
        console.log('Entrei no upload64')
        //console.log(nomeArq)
        fs.writeFile('./uploads/' + nomeArq + '.png', img, { encondingg: 'base64' }, (e) => {
            resp.end()
        })
    })

    app.route("/usuario/listar").get((req, resp) => {
        dao.listarUsuarios((retorno) => {
            resp.json(retorno)
        })
    })

    app.route("/usuario/pegar_logado").get((req, resp) => {
        dao.selectUsuario(req.query.usuario, (retorno) => {
            console.log(retorno)
            resp.json(retorno)
        })
    })


    app.route("/usuario/atualizar").post((req, resp) => {
        console.log(req.body)
        dao.atualizar(req.body, () => {
            resp.end()
        })
    })

}