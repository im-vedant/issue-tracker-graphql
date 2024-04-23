import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import prisma from "@/prisma/db";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "@/lib/resolvers";
import { typeDefs } from "@/lib/schemas";
export type Context={
  prisma : PrismaClient
}



const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest,Context>(server, {
  context: async (req,res) =>{
    return {
      req,
      res,
     prisma
    }
  },
});

export { handler as GET, handler as POST };

