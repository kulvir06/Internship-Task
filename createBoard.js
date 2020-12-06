const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const randomGen = require('./user methods/randomGen');
const emailExtractor = require("./user methods/emailExtractor.js");
const mysql = require('mysql');

router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());

const dbconnect = require("./user methods/connection.js");
var con =dbconnect.connection();


router.get("/",function(req,res){
    res.sendFile(__dirname+"/html/createBoard.html")
})

router.post("/",function(req,res){
    var name = req.body.name;
    var members = req.body.name1;
    var id = randomGen.randomGen();
    id = id.toString();
    var email = (emailExtractor.email(members));
    var len = email.length;
    for(var i=0;i<len;i++){
        var sql = "insert into boards values ("+mysql.escape(id)+","+mysql.escape(name)+","+mysql.escape(email[i])+",null);";
        con.query(sql,function(err,result,fields){
            if(err) throw err;
        })
    }
    console.log("Created a Board");

})

module.exports = router;





















// function resolveAfter2Seconds() {   
//     return new Promise(resolve => {        
//       setTimeout(() => {

//         var finalID;
//         while(true){ 
//             var idGen = Math.random();
//             if(boardIDs.includes(idGen)===true) console.log("Retry ID Generation");
//             else{
//                 boardIDs.push(idGen)
//                 finalID=idGen;
//                 console.log(boardIDs);
//                 break;
//             }
//         }
//         resolve(finalID);
//       }, 2000);
//     });
//   }

// async function asyncCall() {
//     console.log('calling');
//     const result = await resolveAfter2Seconds();
//     console.log(result);
//     // expected output: "resolved"
//   }