import { pgTable, text, jsonb, integer } from "drizzle-orm/pg-core"
import { services } from "./services";
import { clients } from "./clients";


export const reviews = pgTable('review', {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    serviceId: text('service_id').notNull().references(() => services.id),
    clientId: text('client_id').notNull().references(() => clients.id),

    content: text("content"),
    ratings: integer("ratings"),


});