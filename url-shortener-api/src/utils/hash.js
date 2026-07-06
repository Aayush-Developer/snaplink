const bcrypt=require('bcrypt')


const hashedPass=async (password)=>{
   return   bcrypt.hash(password,10)}

module.exports={hashedPass}