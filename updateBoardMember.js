const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const emailExtractor = require("./user methods/emailExtractor.js");

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());

const dbconnect = require("./user methods/connection.js");
var con =dbconnect.connection();

var boardName;
router.get("/:id",function(req,res){
    boardName=req.params.id;
    res.sendFile(__dirname+"/html/updateBoardMember.html");    
})

router.post("/deleteBoardMember",function(req,res){
    var emails = req.body.email;
    var email_array = (emailExtractor.email(emails));
    var len = email_array.length;
    for(var i=0;i<len;i++){
        var sql = "delete from boards where name = "+mysql.escape(boardName)+" and membersOfBoard = "+mysql.escape(email_array[i])+";";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            console.log('members of board deleted');
        })
    }
})

router.post("/addBoardMember",function(req,res){
    var emails = req.body.email;
    var email_array = (emailExtractor.email(emails));
    var len = email_array.length;
    var sql = "select id,lists from boards where name = "+mysql.escape(boardName)+" limit 1;";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            var id = result[0].id;
            var lists = result[0].lists;
            for(var i=0;i<len;i++){
                var insertsql = "insert into boards values ("+mysql.escape(id)+","+mysql.escape(boardName)+","+mysql.escape(email_array[i])+","+mysql.escape(lists)+");";
                con.query(insertsql,function(err,result,fields){
                    if(err) throw err;
                    console.log('updated boards');
                })
            }           
        })
})

router.post("/changeName",function(req,res){
    var newName=req.body.newBoardName;
    var sql = "update boards set name = "+mysql.escape(newName)+" where name = "+mysql.escape(boardName)+";"
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log('name updated');
    })
})

module.exports=router;