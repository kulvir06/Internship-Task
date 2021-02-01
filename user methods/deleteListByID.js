const mysql = require('mysql');
const dbconnect = require("./connection.js");
const con =dbconnect.connection();

module.exports={
    delete : (lists) => {
        lists.forEach(list => {
            let sql = "delete from lists where id = "+mysql.escape(list);
            con.query(sql,function(err,result,fields){
                if(err) throw err;
                console.log("deleted lists");
            })
                        
        });
    }
}
