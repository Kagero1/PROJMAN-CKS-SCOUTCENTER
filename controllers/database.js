function getInventory(req, res){
    var data = {}
    connection.connect((err)=>{
        connection.query("SELECT name, type, tquantity, cquantity FROM materials INNER JOIN projman.categories WHERE materials.categoryid = categorieid;", function (err, result, fields) {
            if (err) {}
            else if(result) {
            console.log(result);
            data = JSON.stringify(result)
            console.log(data);
            res.render("inventory.hbs", {
                dataSet : data
            })
            }
        }).on('error', function(err) {
            console.log(err);
        });
    });
}

module.exports={
    getInventory
}