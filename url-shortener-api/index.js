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
app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const [result] = await db
      .select()
      .from(urlTable)
      .where(eq(urlTable.shortCode, shortCode));

    if (!result) {
      return res.status(404).send("Short link not found");
    }

    return res.redirect(result.targetURL);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});
app.listen(PORT,()=>{console.log(`Server started in PORT ${PORT}`)})