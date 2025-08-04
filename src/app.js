let express=require("express");
let cookie=require("cookie-parser");
let app=express();
let router=require("./routes/routes.js");
require("dotenv").config();
const db = require("./config/db.js");
const bodyParser = require("body-parser");
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookie());
app.use("/",router);

module.exports=app;
