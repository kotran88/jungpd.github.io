var express = require('express');
var formidable = require('formidable');
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var app = express();
var mysql=require('mysql');
var fs=require('fs');
var client=mysql.createConnection({
        host : 'o2db.cfuba8g7p6k6.ap-northeast-2.rds.amazonaws.com',
        user : 'kotran',
        password : 'qjahsxm1',
        database : 'o2'
})

app.get('/form',function(req,res){
        var output=`
        <html>
                <body>
                        <a href="/gogo" >db go to from node js & aws </a>
                </body>
        </html>
        `;
        res.send(output)
});
app.get("/gogo",function(req,res){
  fs.readFile('/index.html',function(error,data){
    res.send(data.toString())
  })
})
app.get("/db",function(req,res){
        client.query('insert into test values(2, "testtesttest")',function(error,result){
        if(error){
                console.log("error:"+error);
        }else{
        console.log("result : "+result);
        res.send("hahaha");
        }

})
});
app.listen(80,function(){
        console.log("connected");
})
