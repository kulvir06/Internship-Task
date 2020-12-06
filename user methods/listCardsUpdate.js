const mysql = require('mysql');
const dbconnect = require("./connection.js");

var con =dbconnect.connection();

module.exports={
    update: function(cards,listName,id){
        var sql = "update lists set cards = "+mysql.escape(cards)+"where name = "+mysql.escape(listName)+" and id=" +mysql.escape(id)+";";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            
        })
    }
}