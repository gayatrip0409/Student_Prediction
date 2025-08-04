let routes=require("express");
let router=routes.Router();
let control=require("../controllers/regController");
router.get("/",control.home);
router.post("/reg",control.reg); //registration of student
router.post("/loginadmin",control.loginadmin);//admin login and student
router.get("/viewstudents",control.viewstudents );
module.exports=router;
