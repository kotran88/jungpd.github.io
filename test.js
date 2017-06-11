
var express=require('express');
var app=express();
app.get('/',function(res,req){
        console.log("1");
        res.send("hello world");
});
app.listen(80,function(){
        console.log("connected to 8080");
})
