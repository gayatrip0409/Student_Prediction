 const db = require('../config/db');

 //registration for student
 exports.reg=((...data)=>{
     

     return new Promise((resolve,reject)=>{
       db.query("insert into student values('0',?,?,?,?)",[...data],(err,result)=>{
                         if(err)
                        {
                            reject(err);
                        }
                        else{
                            resolve(result);
                        }
                      })
     })
 })

 //login for admin and student
 exports.loginAdmin=(email)=>{
    return new Promise((resolve,reject)=>{
       db.query("select *from admin where email=? ",[email],(err,data)=>{
            if(err)
             {
               reject(err);
             }
             else{
               if(data.length===0)
               {
                 db.query("select * from student where email =?",[email],(err,result)=>{
                    if(err)
                    {
                      reject(err);
                    }
                    else{
                      if(result.length===0)
                      {
                         reject("Not found")
                      }
                      else{
                        //console.log(result[0]);
                        resolve({logindata:result[0],role:"Student"});
                      }
                    }
                 })
               }
               else
               {
                  resolve({logindata:data[0],role:"Admin"});
               }
             }
           })
    })
 }

 // view student

 exports.viewStudents =(req, res)=>{
    return new Promise((resolve, reject)=>{
      db.query("select *from student",(err,result)=>{
         if(err)
         {
          reject(err);
         }
         else{
          resolve(result[0]);
         }
      });
    });

 }

 