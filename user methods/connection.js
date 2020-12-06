//connecting to database
const mysql = require("mysql");

module.exports={
    connection: function(){
        var con = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"password",
            database: "internship"
        })
        
        con.connect(function(err){
            if(err) throw err;
        })
        return con;

    }
}
