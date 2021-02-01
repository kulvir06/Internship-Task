const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const randomGen = require('./user methods/randomGen');
const mysql = require('mysql');
const boardUpdate = require('./user methods/boardListsUpdate');

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());

const dbconnect = require("./user methods/connection.js");

const con = dbconnect.connection();

let boardName;

router.get("/:id",function(req,res){

    boardName = req.params.id;
    res.sendFile(__dirname+"/html/createList.html")
   
})

let x;

router.post("/",function(req,res){
    
    var listName = req.body.listName;
    var id = randomGen.randomGen().toString();

    var sql = "insert into lists values ("+mysql.escape(id)+","+mysql.escape(listName)+","+"null);";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
    })

    var sql = "select lists from boards where name = "+mysql.escape(boardName)+" limit 1 ;"
    con.query(sql,function(err,result,fields){
        if (err) throw err; 
        x = (result[0].lists);   
        if(x==null) x="";
        x=x+id+',';
        boardUpdate.update(x,boardName);
                           
    }) 
})

module.exports=router;
