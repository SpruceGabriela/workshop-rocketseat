const express = require("express");
const server = express();

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum itaque, ut nesciunt deserunt ab officia quia ",
        url: "https://rocketseat.com" 
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum itaque, ut nesciunt deserunt ab officia quia ",
        url: "https://rocketseat.com" 
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Saúde Mental",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum itaque, ut nesciunt deserunt ab officia quia ",
        url: "https://rocketseat.com" 
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum itaque, ut nesciunt deserunt ab officia quia ",
        url: "https://rocketseat.com" 
    }
]


//config arquivos estaticos
server.use(express.static("public"));

//config nunjucks
const nunjucks = require("nunjucks");

nunjucks.configure("views", {
    express: server,
    noCache: true
})


//definir rotas
server.get("/", function(req, res){
    let lastIdeas = [];

    const reversedIdeas = [...ideas].reverse();

    for(let idea of reversedIdeas) {
        if(lastIdeas.length < 3){
            lastIdeas.push(idea);
        }
    }

    return res.render("index.html", { ideas: lastIdeas });
})

server.get("/ideas", function(req, res){

    const reversedIdeas = [...ideas].reverse();

    return res.render("ideias.html", { ideas: reversedIdeas});
})

server.listen(3000);