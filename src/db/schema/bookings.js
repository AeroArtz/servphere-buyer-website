import { pgTable, text, jsonb, integer,date } from "drizzle-orm/pg-core"
import { services } from "./services";
import { clients } from "./clients";


export const bookings = pgTable('booking', {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    serviceId: text('service_id').notNull().references(() => services.id),
    clientId: text('client_id').notNull().references(() => clients.id),
    type: text("type").notNull().default(''),
    startTime: text("startTime").default(''),
    endTime: text("endTime").default(''),
    status: text("status").default(''),
    date_of_booking: date(),


});