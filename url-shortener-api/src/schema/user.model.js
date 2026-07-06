const {integer,varchar,text, pgTable, uuid} =require('drizzle-orm/pg-core')


const userTable=pgTable('users',{
    id:uuid().primaryKey().defaultRandom(),
    name:varchar('name',{length:255}).notNull(),
    email:varchar('email',{length:255}).notNull().unique(),
    password:text("password")
})
//export it as objects

module.exports={
    userTable
}