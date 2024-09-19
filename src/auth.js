import NextAuth, { AuthError, CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { Client } from '../models/clientModel';
import { connectDB } from './utils/connect';
import { redirect } from 'next/navigation';


export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
      GoogleProvider({
        clientId : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email : {
            label: "Email",
            type : "email"
          },
          password : {
            label : "Password",
            type : "password"
          }
        },
        authorize : async (credentials) => {
          const email = credentials.email;
          const password  = credentials.password;
  
          // CONNECT DB
          await connectDB();
  
          const user = await Client.findOne({email}).select("+password");
  
          if (!user) throw new CredentialsSignin({cause:"Invalid Email or Password"});
  
          if (!user.password) 
            throw new CredentialsSignin({cause:"Invalid Email or Password"});
  
          const passMatch = await compare(password, user.password);
  
          if (!passMatch) 
            throw new CredentialsSignin({cause:"Invalid Email or Password"});
  
          return { 
            name: user.name,
            email: user.email,
            id: user._id
          }
  
        }
      }),
      
    ],
    pages: {
      signIn: "/login",
    },
    callbacks : {
      signIn : async ({user, account }) => {
        if (account?.provider === "google") {
          try {
  
            console.log(user);
            const {email, name, image, id} = user
  
            await connectDB();
  
            const alreadyUser = await Client.findOne({email});
  
            console.log(alreadyUser);
  
            if (!alreadyUser){
  
              await Client.create({
                name : name,
                email : email,
                phone: "0505513145",
                googleId : id
              });
  
            }
  
            return true;
          } catch (error){
              throw new AuthError("Error while creating user")
          }
        }
  
        if (account?.provider === "credentials") return true;
  
        return false;
      }
    }
  });

