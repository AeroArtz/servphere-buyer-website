import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db"
import { users } from "./db/schema/users"
import { client_accounts, client_sessions, client_verificationTokens, clients } from "./db/schema/clients"
//import { db, accounts, sessions, users, verificationTokens } from "./schema"
 
export const { handlers, auth, signIn, signOut  } = NextAuth({
 
  providers: [Google],
  adapter: DrizzleAdapter(db, {
    usersTable: clients,
    accountsTable: client_accounts,
    sessionsTable: client_sessions,
    verificationTokensTable: client_verificationTokens,
  }),
  callbacks : {

  }
})