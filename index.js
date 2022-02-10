
var express= require("express");
var app=express()
const path=require("path")
const bodyParser = require("body-parser");

const config = require('./config');
const twitter = require('twitter-lite');
const { access_token_secret } = require("./config");
const client = new twitter(config);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/poststatus',function(req,res){
 console.log("post")
  client.post('statuses/update', { status: 'Have a Wondeful day! ' },{headers:{
    Authorization: 'AAAAAAAAAAAAAAAAAAAAAGZOTgEAAAAACvoAyWYqp16RvxCBh2Ono6mLxbU%3DHGEj7rgjKCSQA2NUc5DEcpVT9axGyElmo2R5GdSdAy2wrGpx2x'
}}).then(result => {
    console.log('You successfully tweeted this : "' + result.text + '"');
    //res.sendStatus(200).send(result)
    
  }).catch(err=>{
      console.log("Err-->",err)
  });

})

app.get('/status',function(request,response){
  response.sendFile("index.html")
  client.get("statuses/home_timeline")
  .then(results => {
    console.log("result", results);
    //response.send(results)
  })
  .catch(err=>{
      console.log("Errr-->",err)
  });
});



app.post('/deletestatus',function(request,response){
  console.log(" Please delete id ", request.body.id);
  
  client.post(`statuses/destroy/:${request.body.id}+".json"`)
  .then(results => {
      console.log("Status successfullt deleted", results);
  })
  .catch(err=>{
      console.log("Errr-->",err)
  });
});


app.listen(8081,function(){
  console.log('Express app listening on port');
  })

// client.get('statuses/home_timeline', function(req, res){
//     let statuses = [];
//     for(let i =0; i<5; i++) {
//         let statusData = ({
//             id: faker.random.number(),
//             title: faker.lorem.words,
//             author: faker.name.firstName() + " " + faker.name.lastName()
//         });
//         statuses.push(statusData);
//     }
//     res.status(200).send(statuses);
// });
  
  
