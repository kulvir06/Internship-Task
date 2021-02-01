const express = require("express");
const mysql = require('mysql');
const router = express.Router();
const emailExtractor = require("./user methods/emailExtractor.js");
const deleteCardByID = require("./user methods/deleteCardByID.js");


const dbconnect = require("./user methods/connection.js");
let con =dbconnect.connection();

router.get("/:id1/:id2",function(req,res){
    let listName = req.params.id2;
    let boardName= req.params.id1;
    let sql = "select cards,lists.id from lists,boards where boards.name="+mysql.escape(boardName)+" and lists.name="+mysql.escape(listName)+" limit 1;"
    
    // let sql = "select lists from boards where name = "+mysql.escape(name)+" limit 1 ;"
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        let cardID = (result[0].cards).substring(0,cardID.length-1);
        let cards = (emailExtractor.email(cardID));
        let listID = result[0].id;
        deleteCardByID.delete(cards);

        // deleteListByID.delete(lists);  
        let sql1 = "delete from lists where id = "+mysql.escape(listID)+";";
        con.query(sql1,function(err,result,fields){
            if(err) throw err;
            console.log('deleted list');
        })   
    })


})

module.exports = router;
