var express= require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require ('mongoose');

var db=mongo.connect("mongodb://localhost:27017/AngularCRUD",function(err,response){
    if(err){
        console.log(err)
    }
    else {
        console.log('connected to' + db +' + ',response)
    }
});

var app=express();
app.use(bosyParser());
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
});

var Schema = mongo.Schema;

var UserSchema = new Schema({
    email :{type: String},password:{type: String},mobile : {type: Number}
}, {versionKey: false});

var model = mongo.model('login',UserSchema,'login');

app.post("/api/login",function(req,res){
    var mod= new model(req.body);
    if(req.body.mode == "save"){
        mod.save(function(err,data){
            if(err){
                res.send(err);
            }
            else {
                res.send({data : "Record has been insrted!!!"});
            }
        });
    }
    else {
        model.findByIdAndUpdate(req.body.id,{name: req.body.name, address: req.body.address},function(err,data){
            if(err){
                res.send(err);
            }
            else {
                res.send({data: "Record has been updated...!!!"});
            }
        });
    }
})

app.post("/api/deleteUser",function(req,res){
    model.remove({_id: req.body.id},function(err){
        if(err){
            res.send(err);
        }
        else {
            res.send({data : "Record has been deleted...!!"});
        }
    });
})

app.get("/api/getUser",function(req,res){
    model.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else {
            res.send(data);
        }
    });

})

app.listen(8080, function(){
    console.log('Voizfonica application is listening on port 8080')
})