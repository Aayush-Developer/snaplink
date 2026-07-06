const {z}=require('zod')
const shortenPostValidation=z.object({
    url:z.string().url(),
    code:z.string().optional()
})
module.exports={
    shortenPostValidation
}