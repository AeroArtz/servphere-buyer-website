import { pgTable, text, jsonb,integer } from "drizzle-orm/pg-core"
import { stores } from "./stores";


export const services = pgTable('service', {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    store_id: text('store_id').notNull().references(() => stores.id),

    label: text("label"),
    thumbnail: jsonb().default({
    }),
    availability: jsonb().default({
    }),
});