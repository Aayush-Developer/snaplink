const express=require('express')
const app=express()
const cors = require("cors");


const urlrouter=require('./src/routes/url.routes')
const router=require('./src/routes/user.routes')

app.use(cors());
app.use(express.json())

const PORT=8000

app.use('/user',router)
app.use('/url',urlrouter)
app.listen(PORT,()=>{console.log(`Server started in PORT ${PORT}`)})