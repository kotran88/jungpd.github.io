var express = require('express');

var app = express();
var handlebars=require('express-handlebars').create({defaultLayout:null})
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
var fs=require('fs');
var mysql=require('mysql');

var client=mysql.createConnection({
        host : 'ic.cfuba8g7p6k6.ap-northeast-2.rds.amazonaws.com',
        user : 'kotran',
        password : 'qjahsxm1',
        database : 'ic'
      })
app.get('/form',function(req,res){
        var output=`
        <html>
                <body>
                        <a href="/gogo" >dbbbbb go to from node js & aws </a>
                </body>
        </html>
        `;
        res.send(output)
});
app.get("/gogo",function(req,res){
  console.log("bbb")
    res.render('gogo');
})

app.get("/stat/:nickname",function(req,res){
  var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	var time=new Date().toLocaleTimeString('en-US', { hour12: false,
																						hour: "numeric",
																						minute: "numeric"});
	if(dd<10){
			dd='0'+dd;
	}
	if(mm<10){
			mm='0'+mm;
	}
	var today = yyyy+'/'+mm+'/'+dd+' '+time;
  console.log("nickname : "+req.params.nickname);
  client.query('insert into user(id,nick,conn_date) values("test","'+req.params.nickname+'","'+today+'")',function(error,result){
         if(error){
                 console.log("error:"+error);
         }else{
         console.log("result : "+result);
         res.render("result",{result:req.params.nickname})
         }

})
})
app.listen(8080,function(){
        console.log("connected");
})
