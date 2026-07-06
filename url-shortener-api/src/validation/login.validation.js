
const {z}=require('zod')

const loginPostValidation=z.object({
    
    email:z.string().email(),
    password:z.string().min(4)
})
module.exports={
    loginPostValidation
}