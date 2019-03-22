var express=require('express');
var mongoose=require('mongoose');

var router=express.Router();

var url='mongodb://localhost:27017/test';
var carSchema={
    id:Number,
    name:String,
    year:Number
}

var carModel=mongoose.model('car',carSchema);


router.get('/cars',(req,res)=>{
    mongoose.connect(url);
    mongoose.model('car').find((err,response)=>{
        if(err) throw err;
        res.send(response);
        mongoose.connection.close();
    })
})

router.get('/cars/:id',(req,res)=>{
    var resId=req.params.id;
    mongoose.connect(url);
    mongoose.model('car').findOne({id:resId},(err,response)=>{
        res.send(response);
    });
})

router.post('/cars',(req,res)=>{
    var car={
        id:req.body.id,
        name:req.body.name,
        year:req.body.year
    }
    mongoose.connect(url);
    new carModel(car).save((err)=>{
        if(err) res.send(err);
        res.status(201).send('Data Saved successfully!');
        mongoose.connection.close();
    });
});

router.put('/cars/:id',(req,res)=>{
    var carId=req.params.id;
    mongoose.connect(url);
    mongoose.model('car').findOneAndUpdate({id:req.params.id},{$set:{year:req.body.year}},{new:true},(err,response)=>{
        if(err) throw err;
        res.send(response);
        mongoose.connection.close();
    })
})

router.delete('/cars/:id',(req,res)=>{
    var carId=req.params.id;
    mongoose.connect(url);
    mongoose.model('car').findOneAndRemove({id:carId},(err,response)=>{
        if(err) throw err;
        res.send(response);
    })
})

module.exports=router;