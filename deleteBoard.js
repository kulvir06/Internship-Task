const express = require("express");
const mysql = require('mysql');
const router = express.Router();
const emailExtractor = require("./user methods/emailExtractor.js");
const deleteListByID = require("./user methods/deleteListByID.js");

const dbconnect = require("./user methods/connection.js");
var con =dbconnect.connection();

router.get("/:id",function(req,res){
    var name = req.params.id;
    var sql = "select lists from boards where name = "+mysql.escape(name)+" limit 1 ;"
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        var listID = (result[0].lists);
        listID = listID.substring(0,listID.length-1);
        var lists = (emailExtractor.email(listID));
        deleteListByID.delete(lists);     
    })
    sql = "delete from boards where name = "+mysql.escape(name)+";";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log('deleted board');
    })

})

module.exports = router;