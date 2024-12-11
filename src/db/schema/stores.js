import { pgTable, text, jsonb, integer } from "drizzle-orm/pg-core"
import { users } from "./users";


export const stores = pgTable('store', {
    id: text("id")
    .primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    ownerEmail: text("ownerEmail").default(""),
    img: text("img").default(""),
    bio: text("bio").default(""),
    link: text("link").default(""),
    location: text("location").default(""),
    username: text("username").default(""),
    themeColor: text("themeColor").default(""),
    socials: jsonb().default({ 
        insta: "",
        tiktok: "",
        youtube: "" 
    }),
});