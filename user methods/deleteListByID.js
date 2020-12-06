const mysql = require('mysql');
const dbconnect = require("./connection.js");
var con =dbconnect.connection();

module.exports={
    delete : function(lists){
        for(var i = 0;i<lists.length;i++){
            var sql = "delete from lists where id = "+mysql.escape(lists[i]);
            con.query(sql,function(err,result,fields){
                if(err) throw err;
                console.log("deleted lists");
            })
        }
    }
}