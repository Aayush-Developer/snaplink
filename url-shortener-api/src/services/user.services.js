const db=require('../index.js')
const {userTable}=require('../schema/user.model.js')
const {eq}=require('drizzle-orm')
const existingUser=async (email)=>{
  
    const [user]=await db.select().from(userTable).where(eq(userTable.email,email))
    
 return user
}

module.exports={
    existingUser
}