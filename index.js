const express = require("express");
const app = express();


const createBoard = require("./createBoard.js");
app.use("/createBoard",createBoard);

const createLists = require("./createLists.js");
app.use("/createLists",createLists);

const deleteBoard = require("./deleteBoard.js");
app.use("/deleteBoard",deleteBoard);

const addCards = require("./addCards.js");
app.use("/addCards",addCards);

const deleteList = require("./deleteList.js");
app.use("/deleteList",deleteList);

const updateBoardMember = require("./updateBoardMember.js");
app.use("/updateBoard",updateBoardMember);

const modifyLists = require("./modifyLists.js");
app.use("/modifyLists",modifyLists);

app.listen(3000,function(){
    console.log("Server is running on port 3000!!");
})