var express=require('express');
var mongoose=require('mongoose');

var router=express.Router();
var studentSchema={
    rollNo:Number,
    name:String,
    class:Number,
}
var url='mongodb://localhost:27017/test';
var studentModel=mongoose.model('student',studentSchema);


router.post('/students',(req,res)=>{
    mongoose.connect(url);
    var student={
        rollNo:req.body.rollNo,
        name:req.body.name,
        class:req.body.class
    }
    var newStudent=new studentModel(student);
    newStudent.save((err)=>{
        if(err) res.send(err);
        res.status(201).send('Data Save successfully');
        mongoose.connection.close();
    })
})

router.get('/students',(req,res)=>{
    mongoose.connect(url);
    mongoose.model('student').find((err,response)=>{
        if(err) res.send(err);
        res.send(response);
        mongoose.connection.close();
    })
})

router.get('/students/:id',(req,res)=>{
    mongoose.connect(url);
    mongoose.model('student').findOne({rollNo:req.params.id},(err,response)=>{
        if(err) res.send(err);
        res.send(response);
        mongoose.connection.close();
    })
})

router.put('/students/:id',(req,res)=>{
    mongoose.connect(url);
    mongoose.model('student').findOneAndUpdate({rollNo:req.params.id},{$set:{name:req.body.name,class:req.body.class}},
        {new:true},(err,response)=>{
            if(err) req.send(err);
            res.send(response);
            mongoose.connection.close();
    })
})

router.delete('/students/:id',(req,res)=>{
    mongoose.connect(url);
    mongoose.model('student').findOneAndRemove({rollNo:req.params.id},(err,response)=>{
        if(err) res.send(err);
        res.send(response);
        mongoose.connection.close();
    })
})

module.exports=router;