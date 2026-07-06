const {integer,varchar,text, pgTable, uuid,timestamp} =require('drizzle-orm/pg-core')
const {userTable} =require('./user.model.js')

const urlTable=pgTable('urls',{
    id:uuid().primaryKey().defaultRandom(),
    shortCode: varchar('code',{length:155}).unique().notNull(),
    targetURL:text('target').notNull(),
    userId:uuid().references(()=> userTable.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()

})
module.exports={
    urlTable 
}