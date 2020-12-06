
const boardIDs = [];
module.exports={
    randomGen: function(){
        var finalID;
    while(true){ 
        var idGen = Math.random();
        idGen = idGen.toString();
        idGen = idGen.substring(0,7);
        if(boardIDs.includes(idGen)===true) console.log("Retry ID Generation");
        else{
            boardIDs.push(idGen)
            finalID=idGen;
            //  console.log(boardIDs);
            break;
        }
    }
    return finalID;
    }
}