import express from 'express';
import createBoard from "./createBoard.js";
import createLists from "./createLists.js";
import deleteBoard from "./deleteBoard.js";
import addCards from "./addCards.js";
import deleteList from "./deleteList.js";
import modifyLists from "./modifyLists.js";
import updateBoardMember from "./updateBoardMember.js";

const app = express();


app.use("/createBoard",createBoard);
app.use("/createLists",createLists);
app.use("/deleteBoard",deleteBoard);
app.use("/addCards",addCards);
app.use("/deleteList",deleteList);
app.use("/updateBoard",updateBoardMember);
app.use("/modifyLists",modifyLists);

app.listen(3000,function(){
    console.log("Server is running on port 3000!!");
})

module.exports = app;
