const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const jobs = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        name: "Pedro Mendonça",
        role: "Web Developer",
        description: "Estudante de Análise e Desenvolvimento de Sistemas na FIAP, com conhecimento em JavaScript, Java e Python. <br/> Além da faculdade, estou fazendo cursos da Rocketseat, DevPleno e Alura. <br/><br/>Atualmente, estou buscando pela minha primeira oportunidade de trabalho na área.",
        links: [
            { name: "Github", url: "https://github.com/pomendonca" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/pomendonca/" },
            { name: "E-mail", url: "mailto:mendonca-pedro@outlook.com" }
        ]
    }
    return res.render("about", { about })
})

server.get("/portfolio", function(req, res) {
    return res.render("portfolio", { items: jobs })
})

server.get("/job", function (req, res) {
    const id = req.query.id
    const job = jobs.find(function(job){
        return job.id == id
    })
    
    if (!job) {
        return res.send("Video not Found!")
    }

    return res.render("job", { item: job })
})

server.listen(5000, function(){
    console.log("server is running")
})