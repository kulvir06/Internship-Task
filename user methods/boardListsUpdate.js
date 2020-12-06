const mysql = require('mysql');
const dbconnect = require("./connection.js");

var con =dbconnect.connection();

module.exports={
    update: function(lists,boardName){
        var sql = "update boards set lists = "+mysql.escape(lists)+"where name = "+mysql.escape(boardName)+";";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            
        })
    }
}