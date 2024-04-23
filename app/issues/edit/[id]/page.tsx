import React from 'react'
import prisma from '@/prisma/db'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../../_components/IssueFormSkeleton'
import { getServerSession } from 'next-auth'
import AuthOptions from '@/app/auth/authOptions'
import { Text } from '@radix-ui/themes'
interface Props {
    params : { id : string}
}
const IssueForm =dynamic(()=>import('../../_components/IssueForm'),{ssr: false, loading: ()=> <IssueFormSkeleton/>})
const EditIssuePage = async({params}: Props) => {
  const session=await getServerSession(AuthOptions)
const issueDetails =await prisma.issue.findUnique({where :{id : parseInt(params.id)}})
if(!issueDetails ||  !session?.user?.email)
notFound()
if(issueDetails.createdById===session?.user?.email)
  return (
   <IssueForm issue={issueDetails}/>
  )
  else 
  return <div>
    <Text className='text-center font-bold text-lg w-full'>You are not authorized to edit this issue</Text>
  </div>
}

export default EditIssuePage