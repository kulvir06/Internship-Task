const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const emailExtractor = require("./user methods/emailExtractor.js");
const mysql = require('mysql');

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());

const dbconnect = require("./user methods/connection.js");
const { route } = require("./createBoard.js");
var con =dbconnect.connection();

var boardName, listName, cardName;
router.get("/:id1/:id2/:id3",function(req,res){
    boardName = req.params.id1;
    listName = req.params.id2;
    cardName = req.params.id3;
    res.sendFile(__dirname+"/html/modifyLists.html");
})

router.post("/newListName",function(req,res){
    var newListName = req.body.newListName;
    var sql = "select lists.id from lists,boards where boards.name="+mysql.escape(boardName)+" and lists.name="+mysql.escape(listName)+" limit 1;"
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        var id = result[0].id;
        var newsql = "update lists set name = "+mysql.escape(newListName)+" where id = "+mysql.escape(id)+";";
        con.query(newsql,function(err,result,fields){
            if(err) throw err;
            console.log('updated list name');
        })
    })
})

router.post("/newCardName",function(req,res){
    var newCardName = req.body.newCardName;
    var sql = "select cards.id from lists,boards,cards where boards.name = "+mysql.escape(boardName)+"and lists.name = "+mysql.escape(listName)+"and cards.name = "+mysql.escape(cardName)+" limit 1;";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        var id = result[0].id;
        var newsql = "update cards set name = "+mysql.escape(newCardName)+"where id = "+mysql.escape(id)+";"
        con.query(newsql,function(err,result,fields){
            if(err) throw err;
            console.log('updated card name');
        })
    })
})

router.post("/newDescription",function(req,res){
    var newDescription = req.body.newDescription;
    var sql = "select cards.id from lists,boards,cards where boards.name = "+mysql.escape(boardName)+"and lists.name = "+mysql.escape(listName)+"and cards.name = "+mysql.escape(cardName)+" limit 1;";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        var id = result[0].id;
        var newsql = "update cards set description = "+mysql.escape(newDescription)+"where id = "+mysql.escape(id)+";"
        con.query(newsql,function(err,result,fields){
            if(err) throw err;
            console.log('updated card description');
        })
    })
})

router.post("/add",function(req,res){
    var emails = req.body.emails;
    var email_array = (emailExtractor.email(emails));
    var len = email_array.length;
    var sql = "select cards.id,cards.description from lists,boards,cards where boards.name = "+mysql.escape(boardName)+"and lists.name = "+mysql.escape(listName)+"and cards.name = "+mysql.escape(cardName)+" limit 1;";
    con.query(sql,function(err,result,fields){
        var id = result[0].id;
        var desc = result[0].description;
        for(var i=0;i<len;i++){
            var insertsql = "insert into cards values("+mysql.escape(id)+","+mysql.escape(cardName)+","+mysql.escape(desc)+","+mysql.escape(email_array[i])+");";
            con.query(insertsql,function(err,result,fields){
                if(err) throw err;
                console.log('updated cards users');
            })
        }
    })
})

router.post("/delete",function(req,res){
    var emails = req.body.emails;
    var email_array = (emailExtractor.email(emails));
    var len = email_array.length;
    var sql = "select cards.id from lists,boards,cards where boards.name = "+mysql.escape(boardName)+"and lists.name = "+mysql.escape(listName)+"and cards.name = "+mysql.escape(cardName)+" limit 1;";
    con.query(sql,function(err,result,fields){
        var id = result[0].id;
        for(var i=0;i<len;i++){
            var deletesql = "delete from cards where assignedUser = "+mysql.escape(email_array[i])+"and id = "+mysql.escape(id)+";";
            con.query(deletesql,function(err,result,fields){
                if(err) throw err;
                console.log('assigned user deleted');
            })
        }
    })
})

module.exports=router;