module.exports={
    email: function(str){
        var emails = [];
        var w="";    
        str = str+",";
        var len = str.length;
        for(i=0;i<len;i++){
            if(str[i]===","){
                emails.push(w);
                w="";
            } 
            else {
                w=w+str[i];
            } 
        }
        return emails;   
    }
}
