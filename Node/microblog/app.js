const express = require('express');
const cors = require('cors')

const userWS = require('./usuario/usuario.ws');
const postWS = require('./post/post.ws');
const loginCheck = require('./logincheck');
const app = express();

app.use(express.json());
app.use(cors());

loginCheck(app)
userWS(app);
postWS(app);

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});