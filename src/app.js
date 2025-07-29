let express=require("express");
require("dotenv").config();
const db = require("../db.js");
const bodyParser = require("body-parser");

require("dotenv").config();
let app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json);

module.exports=app;
