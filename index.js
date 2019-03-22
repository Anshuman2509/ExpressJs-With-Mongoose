var express=require('express');
var cors=require('cors');
var cars=require('./cars');
var students=require('./students');

var app=express();
app.use(express.json());

app.use('/index',cars);
app.use('/index',students);
app.listen(3000);