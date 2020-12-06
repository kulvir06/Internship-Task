const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const randomGen = require('./user methods/randomGen');
const emailExtractor = require("./user methods/emailExtractor.js");
const mysql = require('mysql');

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());

const dbconnect = require("./user methods/connection.js");
const listCardsUpdate = require("./user methods/listCardsUpdate");
var con =dbconnect.connection();

var listName,boardName ;

router.get("/:id1/:id2",function(req,res){
    listName = req.params.id2;
    boardName = req.params.id1;
    res.sendFile(__dirname+"/html/addCards.html");
})

router.post("/",function(req,res){
    var name = req.body.name;
    var description = req.body.description;
    var users = req.body.users;
    var id = randomGen.randomGen();
    id = id.toString();
    var email = (emailExtractor.email(users));
    var len = email.length;
    for(var i=0;i<len;i++){
        var sql = "insert into cards values("+mysql.escape(id)+","+mysql.escape(name)+","+mysql.escape(description)+","+mysql.escape(email[i])+");";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
            console.log('card created');
        })
    }
    var sql = "select cards,lists.id from lists,boards where boards.name="+mysql.escape(boardName)+" and lists.name="+mysql.escape(listName)+" limit 1;"
    con.query(sql,function(err,result,fields){
        if (err) throw err; 
        var x = (result[0].cards); 
        var list_id = result[0].id; 
        if(x==null) x="";
        x=x+id+',';
        listCardsUpdate.update(x,listName,list_id);
                           
    })
})

module.exports=router;