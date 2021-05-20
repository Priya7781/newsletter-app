const { response } = require("express");
const express=require("express");
const { url } = require("inspector");
const request= require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res)
{
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
   const data={
       members:[
           {
           email_address : email,
           status:"subscribed",
           merge_fields:{
               FNAME:firstName,
               LNAME:lastName
           }
           }
        ]
   };
   const JSONData= JSON.stringify(data);

   
const url="https://us6.api.mailchimp.com/3.0/lists/6637a7e06f";
const options= {
    method:"POST",
    auth:"priya:5225ad9850db2435b067b13209a405cc-us6"
}
    const request= https.request(url,options,function(response)
   {
    if(response.statusCode===200)
    {
        res.sendFile(__dirname+"/success.html");
    }   else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
       console.log(JSON.parse(data));
   });

   });
request.write(JSONData);
request.end();
});

app.post("/failure", function (req, res){
    res.redirect("/");
  });

app.listen(process.env.PORT||3000,function()
{
    console.log("server is running on port 3000");
});


//5225ad9850db2435b067b13
//6637a7e06f