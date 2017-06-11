var express = require('express');

var app = express();
var handlebars=require('express-handlebars').create({defaultLayout:null})
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
var fs=require('fs');

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
app.listen(80,function(){
        console.log("connected");
})
