const express = require("express");
const server = express();

const db = require("./db")

//config arquivos estaticos
server.use(express.static("public"));

//habilitar req.body
server.use(express.urlencoded({ extended: true }))

//config nunjucks
const nunjucks = require("nunjucks");

nunjucks.configure("views", {
    express: server,
    noCache: true
})


//definir rotas
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err) return console.log(err)

        const reversedIdeas = [...rows].reverse();
        let lastIdeas = [];
    
        for(let idea of reversedIdeas) {
            if(lastIdeas.length < 3){
                lastIdeas.push(idea);
            }
        }
    
        return res.render("index.html", { ideas: lastIdeas });

        console.log(rows)
    })


    
})

server.get("/ideas", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse();
        return res.render("ideias.html", { ideas: reversedIdeas});    
    })

})

server.get("/delete", function(req, res){
    const {id} = req.query;

    db.all(`DELETE FROM ideas WHERE id = ${id}`, function(err, rows){
        res.redirect("/ideas")
    })
})

server.post("/", function(req, res){
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    //insert values

    db.run(query, values, function(err){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/ideas")

    })
})

server.listen(3000);