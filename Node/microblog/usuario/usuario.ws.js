const dao = require('./usuario.dao')
const multer = require('multer')
const fs = require('fs')

module.exports = (app) => {

    const configMulter = multer.diskStorage(
        {
            destination : (req, res, cb) => {
                cb(null, './uploads')
            }, filename : (req, file, cb) => {
                cb(null,file.originalname)
            }
        }
    )
    app.route("/usuario/login").post( (req, resp) => {
        dao.consultar(req.body, (result) => {
            resp.json(result)
        })
    })

    app.route("/usuario/salvar").post( (req, resp) => {
        dao.salvar(req.body, () => {
            console.log(req.body)
            /*let img = req.body.imagem.split(';base64,').pop()
            fs.writeFile('./uploads/imagem.png',img,{encondingg : 'base64'}, (e) => {
                resp.end()
            })*/
            resp.end()
        })
    })

    /*app.post('/upload', multer({storage : configMulter}).single('arquivo'),(req, res) => {
        let obj = JSON.parse(req.body.dados)
        console.log(obj)
        res.end()
    })*/


    /*app.post('/upload64',multer().none(), (req, res) => {
        let img = req.body.imagem.split(';base64,').pop()
        fs.writeFile('./uploads/imagem.png',img,{encondingg : 'base64'}, (e) => {
            res.end()
        })
    })*/

}