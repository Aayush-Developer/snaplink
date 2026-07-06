const express=require('express')
const router=express.Router()
const {nanoid}=require('nanoid')
const {eq, and}=require('drizzle-orm')
const {shortenPostValidation}=require('../validation/url.validation')
const db=require('../index.js')
const { urlTable } = require('../schema/url.model')
const { userTable } = require('../schema/user.model.js')
const authMiddleware=require('../middleware/authMiddleware.js')
const { id } = require('zod/locales')
const { success } = require('zod')




router.patch("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { code } = req.body;
    const id = req.params.id;

    if (!code || !code.trim()) {
      return res.status(400).json({
        error: "Alias is required.",
      });
    }

   
    const [existing] = await db
      .select()
      .from(urlTable)
      .where(eq(urlTable.shortCode, code));

   
    if (existing && existing.id !== id) {
      return res.status(409).json({
        error: "This alias already exists.",
      });
    }

    const [result] = await db
      .update(urlTable)
      .set({
        shortCode: code,
      })
      .where(
        and(
          eq(urlTable.id, id),
          eq(urlTable.userId, req.user.id)
        )
      )
      .returning();

    if (!result) {
      return res.status(404).json({
        error: "URL not found.",
      });
    }

    return res.status(200).json({
      success: "Short URL updated successfully.",
      url: result,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});




router.post('/shorten', authMiddleware, async (req, res) => {
    try {

        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ error: "User not valid" });
        }

        const validURL = await shortenPostValidation.safeParseAsync(req.body);

        if (!validURL.success) {
            return res.status(400).json({
                error: validURL.error.errors[0].message,
            });
        }

        const { url, code } = validURL.data;

        const shortCode = code ?? nanoid(6);


        const [existing] = await db
            .select()
            .from(urlTable)
            .where(eq(urlTable.shortCode, shortCode));

        if (existing) {
            return res.status(409).json({
                error: "This alias already exists. Please choose another one.",
            });
        }

       

        const [result] = await db
            .insert(urlTable)
            .values({
                shortCode,
                targetURL: url,
                userId,
            })
            .returning({
                id: urlTable.id,
                shortCode: urlTable.shortCode,
                targetURL: urlTable.targetURL,
            });

        return res.status(201).json({
            id: result.id,
            shortCode: result.shortCode,
            target: result.targetURL,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: "Internal Server Error",
        });

    }
});

router.get("/codes", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  const codes = await db
    .select()
    .from(urlTable)
    .where(eq(urlTable.userId, userId));

  if (codes.length === 0) {
    return res.status(404).json({
      error: "No URLs found",
    });
  }

  return res.status(200).json({
    code: codes,
  });
});
router.get('/:shortCode',async (req,res)=>{
    const code=req.params.shortCode;
    const [result]=await db.select().from(urlTable).where(eq(urlTable.shortCode,code))

    if(!result){
        return res.status(400).json({error:'no shortcode exists'})
    }
    return res.redirect(result.targetURL)
})
router.delete('/delete/:id',authMiddleware,async (req,res)=>{
    const id = req.params.id;
    const [isthere]=await db.select().from(urlTable).where(eq(urlTable.id,id))
    if(!isthere){
        return res.status(400).json({error:'no url with this id exists'})
    }
    await db.delete(urlTable).where(and(
        eq(urlTable.userId,req.user.id),eq(urlTable.id,id)
    ))
    return res.status(200).json({success:'url deleted successfully'})
})
module.exports=router