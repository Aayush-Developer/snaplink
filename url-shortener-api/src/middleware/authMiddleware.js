const jwt=require('jsonwebtoken')

require('dotenv').config()
const authMiddleware=(req,res,next)=>{
   try{
     const authHeader=req.headers.authorization
     if(!authHeader){
        return res.status(201).json({error:'Missing token'})
     }
     const token=authHeader.split(" ")[1]
     
     const decoder=jwt.verify(token,process.env.JWT_SECRET)
     req.user=decoder
     next()
   } catch(err){
    return res.status(400).json({error:'some error occured'})
   }
   
    

}
module.exports=authMiddleware