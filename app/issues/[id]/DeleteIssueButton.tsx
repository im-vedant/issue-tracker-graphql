'use client'
import { Button, } from '@radix-ui/themes'
import { AlertDialog } from '@radix-ui/themes'
import { Issue } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Spinner from '@/components/Spinner'
import client from '@/lib/apolloClient'
import { DELETE_ISSUE } from '@/lib/mutations'
const DeleteIssueButton = ({issueDetails} : {issueDetails : Issue}) => {
  const router=useRouter()
  const [error, setError]=useState(false)
  const [loading, setLoading]=useState(false)
  async function handleDelete(){
    try {
      setLoading(true)
      let { data : {deleteIssue} } = await client.mutate({mutation :DELETE_ISSUE,variables : {deleteIssueId : issueDetails.id}});
      if(deleteIssue==null)
        throw new Error("some error occured")
      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setLoading(false)
      setError(true)
      
    }
  }
  return (
    <><AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' disabled={loading}>Delete Issue
        {
          loading && <Spinner/> 
}</Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          Are you sure you want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, marginTop: '12px', justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel>
            <Button color='gray' variant='soft'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red' onClick={handleDelete}> Delete Issue</Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>

    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>
        <Button color='gray' mt='2' variant='soft' onClick={()=>setError(false)}>OK</Button>
      </AlertDialog.Content>
      </AlertDialog.Root></>
  )
}

export default DeleteIssueButton