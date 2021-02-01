const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');

const router = express.Router();

const randomGen = require('./user methods/randomGen');
const emailExtractor = require("./user methods/emailExtractor.js");

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());

const dbconnect = require("./user methods/connection.js");

let con =dbconnect.connection();

router.get("/",function(req,res){

    res.sendFile(__dirname+"/html/createBoard.html")

})

router.post("/",function(req,res){

    let name = req.body.name;
    let members = req.body.name1;
    let id = randomGen.randomGen().toString();

    let emails = (emailExtractor.email(members));
    emails.forEach(email => {
        let sql = "insert into boards values ("+mysql.escape(id)+","+mysql.escape(name)+","+mysql.escape(email)+",null);";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
        })        
    });
    console.log("Created a Board");

})

module.exports = router;
