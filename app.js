const express = require("express")
const bparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cparser = require("cookie-parser")
const app = express()

hbs.registerPartials(__dirname + "/views/partials", ()=>{
    console.log("Partials are loaded successfully")
})

app.set('view engine', 'hbs')

app.use(express.static(__dirname + "/public"))

app.use(session({
    secret: "cksScoutCenter",
    name: "acctCookie",
    resave: true,
    saveUninitialized: true,
    cookie:{

    }
}))

app.use(cparser())

app.use(bparser.json({limit: "50mb"}))
app.use(bparser.urlencoded({limit: "50mb", extended: true}))

//Models

//Controllers

//Routes
app.get("/", (req, res)=>{
    res.render("login.hbs");
})
app.get("/home", (req, res)=>{
    res.render("home.hbs");
})
app.get("/inventory", (req, res)=>{
    res.render("inventory.hbs");
})
app.get("/requestItems", (req, res)=>{
    res.render("request.hbs");
})
app.get("/requestStatus", (req, res)=>{
    res.render("request-status.hbs");
})

//Listen
app.listen(process.env.PORT || 3000, function(){
    console.log("Server Live at Port 3000");
})