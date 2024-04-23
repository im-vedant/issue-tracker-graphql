import { DateTimeResolver } from "graphql-scalars";
import {Context} from '@/app/api/graphql/route'
import { Issue } from "@prisma/client";
import AuthOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { issueSchema, patchIssueSchema } from "@/app/validationSchema";
export const resolvers = {
    DateTime: DateTimeResolver,
    Query: {
      getAllIssues: async(parent: any, args: any, context: Context) => {
       return await context.prisma.issue.findMany()
      },
      getAllUsers: async(parent: any, args: any, context: Context) => {
       return await context.prisma.user.findMany()
      },
      getLatestIssues : async(parent: any, args: any, context: Context) => {
       return await context.prisma.issue.findMany({
            orderBy: {
              createdAt: "desc",
            },
            take: 5,
            include :{
                assignedTo : true
            }
          });
      },
      getIssuesByPageNumber : async(parent: any, args: any, context: Context) => {
        const columns : {
          label : string,
          value : keyof Issue ,
          className ?:string 
         }[]=[{
          label : "Issues",
          value : "title"
         },
         {
          label : "Status",
          value : "status",
          className : "hidden md:table-cell"
         },
         {
          label : "Created",
          value : "createdAt",
          className : "hidden md:table-cell"
        }]
        let orderBy= columns.map(column => column.value).includes(args.orderBy) ? {[args.orderBy] : 'asc'} :undefined
       return await context.prisma.issue.findMany({
        where :{
            status  : args.status
          },
          orderBy ,
          skip : (args.page - 1) * args.pageSize,
          take : args.pageSize
          });
      }
    },
    Mutation : {
      createIssue : async(parent : any,args : any, context : Context) => {
        const session =await getServerSession(AuthOptions)
        if(!session)
        return new Error("Unauthorised")
        const body = args

        const validation= issueSchema.safeParse(body)
         if(!validation.success)
         {
            return new Error (validation.error.errors[0].message)
         }
         const newIssue =await context.prisma.issue.create({
          data :{
              title : body.title,
              description : body.description,
              createdById: session!.user!.email!
          }
       })
      return newIssue
      },
      updateIssue : async(parent : any,args : any, context : Context) => {
        const session =await getServerSession(AuthOptions)
        if(!session)
        return new Error("Unauthorised")
        const body = args
        const validation= patchIssueSchema.safeParse(body)
         if(!validation.success)
         {
            return new Error (validation.error.errors[0].message)
         }
        
if(body.assignedToId){
  const user =await  context.prisma.user.findUnique({
       where :{
           id : body.assignedToId ,
       }
   })
   if(!user)
    return new Error ("Invalid User")
}
const issue =await context.prisma.issue.findUnique({
   where : {
       id : parseInt(body.id)
   }
})
if(!issue)
return new Error ("Invalid Issue")
const updatedIssue=await context.prisma.issue.update({
   where : {
       id : issue.id
   },
   data : {
       title : body.title,
       description : body.description,
       assignedToId : body.assignedToId,
       status : body.status
   }
})
    return updatedIssue
      },
      deleteIssue : async(parent : any,args : any, context : Context) => {
        const session =await getServerSession(AuthOptions)
        if(!session)
        return new Error("Unauthorised")
        const body = args
        const issue =await context.prisma.issue.findUnique({
           where : {
               id : parseInt(body.id)
           }
        })
        if(!issue)
        return new Error ("Invalid Issue")
        const deletedIssue=await context.prisma.issue.delete({
           where : {
               id : issue.id
           }
        })
        return deletedIssue
      }
    },
    User : {
      createdIssues : async(parent : any,args : any, context : Context) => {
        return await context.prisma.issue.findMany({where : {createdById : parent.email}})
      },
      assignedIssues :async(parent : any,args : any, context : Context) => {
        return await context.prisma.issue.findMany({where : {assignedToId : parent.id}})
      },
    }
  };
  