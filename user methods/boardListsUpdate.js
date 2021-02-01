const mysql = require('mysql');
const dbconnect = require("./connection.js");

const con =dbconnect.connection();

module.exports={
    update: (lists,boardName) => {
        let sql = "update boards set lists = "+mysql.escape(lists)+"where name = "+mysql.escape(boardName)+";";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            
        })
    }
}
