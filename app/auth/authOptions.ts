import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/db';
import { NextAuthOptions } from "next-auth";
const AuthOptions : NextAuthOptions = {
        adapter : PrismaAdapter(prisma),
        providers:[
            GoogleProvider({
                clientId : process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!
              })
        ],
        session :{
            strategy :'jwt'
        },
         secret : process.env.NEXTAUTH_SECRET
    }

export default AuthOptions
