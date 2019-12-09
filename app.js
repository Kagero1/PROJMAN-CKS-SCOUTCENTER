const express = require("express")
const bparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cparser = require("cookie-parser")
const app = express()

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'p@ssword',
  database: 'projman'
});
connection.connect((err) => {
  if (err) { console.log(err); }
  else { console.log('Connected!') }
});

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

app.get("/inventory", (req, res)=>{
    res.render("inventory.hbs");
})
app.get("/requestItems", (req, res)=>{
    res.render("request.hbs");
})
app.get("/requestStatus", (req, res)=>{
    res.render("request-status.hbs");
})

app.post("/home", (req, res)=>{
    let troopNo = req.body.loginTroopNumber
    let password = req.body.loginPassword
    
        connection.query("SELECT * FROM projman.users WHERE troopno = "+troopNo+";", function (err, result, fields) {
          if (err) {}
          else if(result) {
              if(result.password != password) { alert("Wrong Password!");}
              else
                console.log(result);
                res.render("home.hbs");
          }
          else {
            alert("User does not exist!");
          }
        }).on('error', function(err) {
          console.log("[mysql error]",err);
        });
      
    
})


//Listen
app.listen(process.env.PORT || 3000, function(){
    console.log("Server Live at Port 3000");
})