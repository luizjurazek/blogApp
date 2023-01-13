// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = requise('body-parser');
// const mongoose = require('mongoose');
const app = express();


// Configurações do app
    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Mongoose


// Rotas



// Outros
const PORT = 8031
app.listen(PORT, () => {
    console.log("Servidor rodando!");
});