// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require("path");
const mongoose = require('mongoose');

// Configurações do app
    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Mongoose
        // mongoose.Promise = global.Promise; legado, não usar
        mongoose.set('strictQuery', true); // Removendo warning 
        mongoose.connect("mongodb://127.0.0.1/blogapp").then(() => {
            console.log("Conectado ao mongo");
        }).catch((err) => {
            console.log("Erro ao se conectar: " + err);
        });


    // Public 
    app.use(express.static(path.join(__dirname, "public")));

// Rotas
    //home
    app.get('/', (req, res) => {
        res.render("admin/index");
    })
    //admin
    app.use('/admin', admin);


// Outros
const PORT = 8031
app.listen(PORT, () => {
    console.log("Servidor rodando!");
});