
const boardIDs = [];
module.exports={
    randomGen: () => {        
        while(true){

            const newRandomNumber = Math.random().toString().substring(0,7);
            const value = boardIDs.find((boardID) => boardID===newRandomNumber );

            if(typeof value != "undefined"  ) console.log("Retry Id Generation");
            else return newRandomNumber; 
        }
    }
}
