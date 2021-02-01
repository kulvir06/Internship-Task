const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const emailExtractor = require("./user methods/emailExtractor.js");

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());

const dbconnect = require("./user methods/connection.js");
const con =dbconnect.connection();

let boardName;
router.get("/:id",function(req,res){
    boardName=req.params.id;
    res.sendFile(__dirname+"/html/updateBoardMember.html");    
})

router.post("/deleteBoardMember",function(req,res){
    let emails = req.body.email;
    let email_array = (emailExtractor.email(emails));

    email_array.forEach(email_array => {
        let sql = "delete from boards where name = "+mysql.escape(boardName)+" and membersOfBoard = "+mysql.escape(email_array)+";";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            console.log('members of board deleted');
        })     
    });
})

router.post("/addBoardMember",function(req,res){
    let emails = req.body.email;
    let email_array = (emailExtractor.email(emails));

    let sql = "select id,lists from boards where name = "+mysql.escape(boardName)+" limit 1;";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            let id = result[0].id;
            let lists = result[0].lists;
            email_array.forEach( email_array => {
                let insertsql = "insert into boards values ("+mysql.escape(id)+","+mysql.escape(boardName)+","+mysql.escape(email_array)+","+mysql.escape(lists)+");";
                con.query(insertsql,function(err,result,fields){
                    if(err) throw err;
                    console.log('updated boards');
                })
                
            })
         
        })
})

router.post("/changeName",function(req,res){
    let newName=req.body.newBoardName;
    let sql = "update boards set name = "+mysql.escape(newName)+" where name = "+mysql.escape(boardName)+";"
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        console.log('name updated');
    })
})

module.exports=router;
