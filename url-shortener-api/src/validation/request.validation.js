
const {z}=require('zod')

const signupPostValidation=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(4)
})
module.exports={
    signupPostValidation
}