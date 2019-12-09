const express = require("express")
const bparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cparser = require("cookie-parser")
const app = express()

<<<<<<< HEAD
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'p@ssword',
  database: 'projman'
});
var errmsg = "";

connection.connect((err) => {
  if (err) { console.log(err); }
  else { console.log('Connected!') }
});

=======
>>>>>>> parent of b27964b3... .
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
    res.render("login.hbs", {
      errormsg : errmsg
    });
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

<<<<<<< HEAD
app.post("/home", (req, res)=>{
    let troopNo = req.body.loginTroopNumber
    let password = req.body.loginPassword
    
    connection.connect((err)=>{
        connection.query("SELECT * FROM projman.users WHERE troopno = "+troopNo+";", function (err, result, fields) {
          if (err) {}
          else if(result) {
            Object.keys(result).forEach(function(key) {
              var row = result[key];
              console.log(row.name)
            });
            console.log(result);
            console.log(row+" "+password);
              if(result.password != password) { 
                errmsg = "Wrong Password!"
                res.redirect("/")
              }
              else {
                errmsg = "";
                console.log(result);
                res.render("home.hbs");
              }
          }
          else {
            errmsg = "User does not exist!";
            res.redirect("/")
          }
        }).on('error', function(err) {
          console.log(err);
        });
    });
    
})


=======
>>>>>>> parent of b27964b3... .
//Listen
app.listen(process.env.PORT || 3000, function(){
    console.log("Server Live at Port 3000");
})