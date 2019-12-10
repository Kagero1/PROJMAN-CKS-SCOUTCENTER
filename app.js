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
  password: '1212122Charles',
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
const dataTable = require(__dirname + "/controllers/database.js");

//Routes
app.get("/", (req, res)=>{
    res.render("login.hbs", {
      errormsg : errmsg
    });
})
app.get("/home", (req, res)=>{
    res.render("home.hbs", {
      troopNo: req.session.troopNo,
      type: req.session.type
    });
})

app.get("/inventory", (req, res)=>{
  var data = {}
    connection.connect((err)=>{
        connection.query("SELECT materialid, name, type, tquantity, cquantity FROM materials INNER JOIN projman.categories WHERE materials.categoryid = categorieid;", function (err, result, fields) {
            if (err) {}
            else if(result) {
              result.forEach(function(result) {
                data[result.materialid] = result
              })
            console.log(result);
            data = JSON.stringify(data)
            console.log(data);
            res.render("inventory.hbs", {
              troopNo: req.session.troopNo,
              type: req.session.type,
              dataSet : data
            })
            }
        }).on('error', function(err) {
            console.log(err);
        });
    });
})

app.get("/requestItems", (req, res)=>{
  var data = {}
    connection.connect((err)=>{
        connection.query("SELECT troopno, name, categories.type, dateborrow, datereturn, quantityborrow, reasonborrow, approvalstatus FROM users INNER JOIN requests INNER JOIN materials INNER JOIN categories WHERE users.userid = requests.userid AND requests.materialid = materials.materialid AND categories.categorieid = materials.categoryid;", function (err, result, fields) {
            if (err) {}
            else if(result) {
              result.forEach(function(result) {
                data[result.troopno] = result
              })
            console.log(result);
            data = JSON.stringify(data)
            console.log(data);
            res.render("request.hbs", {
              troopNo: req.session.troopNo,
              type: req.session.type,
              dataSet : data
            })
            }
        }).on('error', function(err) {
            console.log(err);
        });
    });
})
app.get("/requestStatus", (req, res)=>{
  var data = {}
    connection.connect((err)=>{
        connection.query("SELECT troopno, name, categories.type, dateborrow, datereturn, quantityborrow, reasonborrow, approvalstatus FROM users INNER JOIN requests INNER JOIN materials INNER JOIN categories WHERE users.userid = requests.userid AND requests.materialid = materials.materialid AND categories.categorieid = materials.categoryid;", function (err, result, fields) {
            if (err) {}
            else if(result) {
              result.forEach(function(result) {
                data[result.troopno] = result
              })
            console.log(result);
            data = JSON.stringify(data)
            console.log(data);
            res.render("request-status.hbs", {
              troopNo: req.session.troopNo,
              type: req.session.type,
              dataSet : data
            })
            }
        }).on('error', function(err) {
            console.log(err);
        });
    });
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
            console.log(data);
            
              if(data.password != password) { 
                errmsg = "Wrong Credentials!"
                res.redirect("/")
              }
              else {
                errmsg = "";
                req.session.troopNo = troopNo;
                req.session.type = data.type;
                req.session.userid = data.userid;
                console.log(result);
                res.redirect("/home");
              }
          }
        }).on('error', function(err) {
          console.log(err);
        });
    });
})

app.post("/requesting", (req, res)=> {
  let user = req.session.userid
  let name = req.body.itemName
  let qty = req.body.itemQty
  let reason = req.body.itemReason
  let dateborrow = req.body.dateBorrow
  let datereturn = req.body.dateReturn

  var materialid
  var data = {}
  connection.connect((err)=>{
    connection.query("SELECT materialid FROM materials WHERE name='"+name+"';", function(err, result, fields) {
      
      Object.keys(result).forEach(function(key) {
        data = result[key];
      });
      materialid = data.materialid;
      console.log(materialid);
    })
    var qry = "INSERT INTO requests(`userid`, `materialid`, `status`, `dateborrow`, `datereturn`, `quantityborrow`, `reasonborrow`, `approvalstatus`) VALUES ('"+user+"', '"+materialid+"', '2', 'in use', '"+dateborrow+"', '"+datereturn+"', '"+qty+"', '"+reason+"', 'pending');"
    connection.query(qry, function(err, result) {
      if(err) { console.log(err); }
      else {
        console.log("Insert Query Successful");
        res.redirect("/requestItems");
      }
    })
  })
})

app.get("/manageRequest", (req, res)=>{
  var data = {}
    connection.connect((err)=>{
        connection.query("SELECT troopno, name, categories.type, dateborrow, datereturn, quantityborrow, reasonborrow, approvalstatus FROM users INNER JOIN requests INNER JOIN materials INNER JOIN categories WHERE users.userid = requests.userid AND requests.materialid = materials.materialid AND categories.categorieid = materials.categoryid;", function (err, result, fields) {
            if (err) {}
            else if(result) {
              result.forEach(function(result) {
                data[result.troopno] = result
              })
            console.log(result);
            data = JSON.stringify(data)
            console.log(data);
            res.render("manage-request.hbs", {
                troopNo: req.session.troopNo,
                type: req.session.type,
                dataSet : data
            })
            }
        }).on('error', function(err) {
            console.log(err);
        });
    });
})


app.get("/logout", (req, res)=>{
  req.session.destroy
  res.redirect("/");
})



//Listen
app.listen(process.env.PORT || 3000, function(){
    console.log("Server Live at Port 3000");
})