let model=require("../models/regModel");
let jwt=require("jsonwebtoken");
let bcrypt = require("bcryptjs");
exports.home=((req,res)=>{
    //console.log("token",req.cookies.xyz);
    let token=req.cookies.xyz;
    jwt.verify(token,process.env.secrete_key,(err,result)=>{
        console.log(result);
    })
    res.send("hello");
})

exports.reg=((req,res)=>{
    let {stuname,email,contact,pass}=req.body;
    let storebcrypt=bcrypt.hashSync(pass,8);
    console.log(storebcrypt);
    let flag=model.reg(stuname,email,contact,storebcrypt);
  
    flag.then((result)=>{
        res.send("Registration Successfull");
    }).catch((err)=>{
        res.send("registration Failed")
        console.log(err);
    });
});


exports.loginadmin=(req, res) =>{
    let {email,pass}=req.body;
    
    model.loginAdmin(email)
        .then((result)=>{
            console.log(result);
            if(result.role==='Admin')
            {
                let token=jwt.sign({
                         username:result.logindata.adminname,
                         pass:result.logindata.password
                     },process.env.secrete_key,{expiresIn:"24h"})
                     //if you want to add image then add that attribute
                     console.log(token);   
                     res.cookie("xyz",token,{
                         maxAge:24 * 60 * 60 * 60* 1000,
                         httpOnly:true
                     })   
                res.send("Login successfully "+result.role)
            }
            else
            {
                console.log(result);
                let flag=bcrypt.compareSync(pass,result.logindata.password);
                if(flag)
                {
                     let token=jwt.sign({
                         username:result.logindata.email,
                         pass:result.logindata.password
                     },process.env.secrete_key,{expiresIn:"24h"})
                     //if you want to add image then add that attribute
                    // console.log(token);   
                     res.cookie("xyz",token,{
                         maxAge:24 * 60 * 60 * 60* 1000,
                         httpOnly:true
                     })  
                   res.send("Login successfully "+result.role);
                }
                else
                {
                   res.send("login falied: "); 
                }
            }
            
        }).catch((err)=>{
            res.send("Login failed");
            console.log(err);
        });
};

exports.viewstudents=(req, res)=>{
    let promise=model.viewStudents();

    promise.then((result)=>{
        res.send({student:result});
    }).catch((err)=>{
        console.log("there is error");
    })
}


