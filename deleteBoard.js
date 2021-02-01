const express = require("express");
const mysql = require('mysql');
const router = express.Router();
const emailExtractor = require("./user methods/emailExtractor.js");
const deleteListByID = require("./user methods/deleteListByID.js");

const dbconnect = require("./user methods/connection.js");
const con =dbconnect.connection();

router.get("/:id",function(req,res){

    let name = req.params.id;
    const sql = "select lists from boards where name = "+mysql.escape(name)+" limit 1 ;"

    con.query(sql,function(err,result,fields){
        if(err) throw err;
        let listID = (result[0].lists);
        listID = listID.substring(0,listID.length-1);
        let lists = (emailExtractor.email(listID));
        deleteListByID.delete(lists);     
    })

    sql = "delete from boards where name = "+mysql.escape(name)+";";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log('deleted board');
        
    })
})

module.exports = router;
