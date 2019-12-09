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
var errmsg = "";

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
    res.render("login.hbs", {
      errormsg : errmsg
    });
})
app.get("/home", (req, res)=>{
    res.render("home.hbs");
})
app.get("/inventory", (req, res)=>{
  var data = {}
  connection.connect((err)=>{
      connection.query("SELECT name, type, tquantity, cquantity FROM materials INNER JOIN projman.categories WHERE materials.categoryid = categorieid;", function (err, result, fields) {
        if (err) {}
        else if(result) {
          console.log(result);
          data = JSON.stringify(result)
          
          //Object.keys(result).forEach(function(key) {
          //  data[result.materialid] = result[key];
          //});
          //data = JSON.stringify(data);
          console.log(data);
          res.render("inventory.hbs", {
            dataSet : data
          })
        }
      }).on('error', function(err) {
        console.log(err);
      });
  });
   
})
app.get("/requestItems", (req, res)=>{
    res.render("request.hbs");
})
app.get("/requestStatus", (req, res)=>{
    res.render("request-status.hbs");
})

app.post("/check", (req, res)=>{
    let troopNo = req.body.loginTroopNumber
    let password = req.body.loginPassword
    var data = {}
    connection.connect((err)=>{
        connection.query("SELECT * FROM projman.users WHERE troopno = "+troopNo+";", function (err, result, fields) {
          if (err) {}
          else if(result) {
            Object.keys(result).forEach(function(key) {
              data = result[key];
            });
            
              if(data.password != password) { 
                errmsg = "Wrong Password!"
                res.redirect("/")
              }
              else {
                errmsg = "";
                console.log(result);
                res.redirect("/home");
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



//Listen
app.listen(process.env.PORT || 3000, function(){
    console.log("Server Live at Port 3000");
})