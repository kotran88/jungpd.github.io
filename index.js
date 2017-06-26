var express = require('express');
var app = express();
var handlebars=require('express-handlebars').create({defaultLayout:null})
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
var fs=require('fs');
var mysql=require('mysql');
var firebase=require("firebase");
firebase.initializeApp({
  serviceAccount:"./service.account.json",
  databaseURL:"https://interval-36309.firebaseio.com/"
})

var ref=firebase.database().ref('statistic');
var message={text: 'hey guys', timestamp: new Date().toString()}
var messagesRef=ref.child('messages');
var logsRef=ref.child('logs');
//var messageRef=messagesRef.push(message)
var promises=[];
// var payload={
//   'logkey' : messageRef.key,s
//   'path':'hey guys again '
// }
// ref.update(payload);
// logsRef.child(messageRef.key).set(message);
// logsRef.child('count').transaction(function(i){
//   return i+1;
// })
// logsRef.orderByKey().limitToLast(1).on('child_added',function(snap){
//
//   console.log('added',snap.val());
// })
// logsRef.on('child_changed',function(snap){
//   console.log('changed',snap.val());
// })


// ref.push({
//   height:'163',
//   name:'eunsol',
//   count:4
// })
// ref.orderByKey().endAt("-KnOcBktyd7-eCmcCBw7").limitToLast(1).on('child_added',function(snap){
//   console.log(snap.val())
//   for (DataSnapshot data : snap.getChildren()) {
//        String userName = String.valueOf(data.child("uname").getValue());
//        driverlist.add(userName);
//   }
// })
// console.log(ref.toString());
// logsRef.orderByChild('count').endAt(3).on('child_added',function(snap){
//   console.log(snap.val());
// })
//
// for (var i=0; i<10; i++){
//
// messageRef.push({
//   height:'167',
//   name:'lucas'
//   count:1
// })
// }

// messageRef.once('value')
//   .then(function(snap){
//     console.log(snap.val())
//   })

// messageRef.once('value')
//   .then(function(snap){
//     snap.forEach(function(childSnap){
//       console.log(childSnap.key+"value : "+childSnap.val())
//     })
//   })

// messageRef.on('value',function(snap){
//   console.log(snap.val();
//
// })

// messageRef.on('child_added',function(snap){
//   snap.ref.update({
//     readOn:(new Data()).toSt
//   })
// })

// messageRef.on('child_added',function(snap){
//   snap.ref.child('newchild').set({
//     anotherDate:(new Date()).toString()
//   })
// })
// messageRef.on('child_changed',function(snap){
//   console.log(snap.val().text)
// })
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
                        <a href="/gogo" >dbbbbb go to from node js & aw2222s </a>
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
  var ref=firebase.database().ref('user');
  ref.push({
    user_id : req.query.nickname,
    create_date : new Date().toString(),
  })
  ref=firebase.database().ref('statistic');
  ref.on('child_added',function(snap){
    console.log('value : '+snap.val());
    var name=snap.val().title;
    console.log("dd"+name);
  })
  res.render("result",{result:req.params.nickname})
//   client.query('insert into user(id,nick,conn_date) values("test","'+req.params.nickname+'","'+today+'")',function(error,result){
//          if(error){
//                  console.log("error:"+error);
//          }else{
//          console.log("result : "+result);
//          res.render("result",{result:req.params.nickname})
//          }
//
// })
});

app.get("/register",function(req,res){
  console.log("ha");
  console.log(req.query.title);
  console.log(req.query.time);
  console.log(req.query.user_id);
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
  var ref=firebase.database().ref('statistic');
  ref.push({
    title : req.query.title,
    time : req.query.time,
    user_id : req.query.user_id,
    create_date : new Date().toString(),
  })

  res.render("gogo");



});
app.listen(8080,function(){
        console.log("connected");
})
