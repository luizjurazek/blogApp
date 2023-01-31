// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require("./models/Postagem");
const Postagem = mongoose.model("postagens");

// Configurações do app
    // Configurando sessão 
    app.use(session({
        secret: "criandosession",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash());
    //Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    })

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
        Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
            res.render("index", {postagens: postagens});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as postagens!");
            res.redirect("/404");
        })
    })

    app.get("/postagem/:slug", (req, res) => {
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
            if(postagem){
                res.render("postagem/index", {postagem: postagem});
            } else {
                req.flash("error_msg", "Esta postagem não existe!");
                res.redirect("/");
            }
        }).catch((err) => {
            req.flash("error_msg", "Erro ao encontrar postagem!");
            res.redirect("/");
        })
    })

    app.get("/404", (req, res) => {
        res.send('Erro 404!');
    })


    //admin
    app.use('/admin', admin);


// Outros
const PORT = 8031
app.listen(PORT, () => {
    console.log("Servidor rodando!");
});