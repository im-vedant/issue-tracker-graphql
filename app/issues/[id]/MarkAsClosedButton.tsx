'use client'
import { Button } from '@radix-ui/themes'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Issue } from '@prisma/client'
import { useRouter } from 'next/navigation'
import client from '@/lib/apolloClient'
import { UPDATE_ISSUE } from '@/lib/mutations'
const MarkAsClosedButton = ({issue} : {issue : Issue}) => {
const [loading,setLoading]=useState(false)
const router=useRouter()
    async function markAsClosed (){
        let data = {
            status : "CLOSED"
        }
        try {
            setLoading(true)
            let { data : {updateIssue} } = await client.mutate({mutation :UPDATE_ISSUE,variables : {updateIssueId : issue.id, status : data.status }});
            if(updateIssue==null)
              throw new Error("some error occured")
            setLoading(false)
            router.refresh()
         
        } catch (error) {
            toast.error("Changes could not be made")
            console.log(error)
        }
        
    }
    
  return (
   <Button color='green' onClick={markAsClosed} disabled={loading}>Mark as Closed</Button>
  )
}

export default MarkAsClosedButton