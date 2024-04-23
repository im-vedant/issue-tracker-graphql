'use client'
import 'react-loading-skeleton/dist/skeleton.css'
import { Select } from '@radix-ui/themes'
import { Issue, User } from '@prisma/client'
import axios from 'axios'
import { useQuery } from '@apollo/client'
import Skeleton from 'react-loading-skeleton'
import toast ,{Toaster} from 'react-hot-toast'
import client from '@/lib/apolloClient'
import { UPDATE_ISSUE } from '@/lib/mutations'
import { GET_ALL_USERS } from '@/lib/queries'
const AssigneeSelect = ({issue} :{issue : Issue}) => {
//    const {data : users ,error, isLoading } =useQuery<User[]>({
//         queryKey : ['users'],
//         queryFn : ()=>axios.get<User[]>('/api/users').then(res=>res.data),
//         staleTime : 60*1000 ,
//         retry :3
//     })

const {loading, error, data}=useQuery(GET_ALL_USERS)
   if(loading)
   return <Skeleton>

   </Skeleton>
  if(error)
  return null

   async function assignTo(userId : string | null){
    if(userId===' ')
    userId=null
    let data = {
        assignedToId : userId ,
        status : userId ?"IN_PROGRESS" : "OPEN"
    }

   try {
    let { data : {updateIssue} } = await client.mutate({mutation :UPDATE_ISSUE,variables : {updateIssueId : issue.id,assignedToId: data.assignedToId, status: data.status }});
    if(updateIssue==null)
      throw new Error("some error occured")
    
   } catch (error) {
    toast.error("Changes could not be made")
    console.log(error)
   }
  }
  return (
  <>
  <Toaster/>
   <Select.Root defaultValue={issue.assignedToId || " "} onValueChange={(userId)=>{
    assignTo(userId)
   }}>
    <Select.Trigger placeholder='Assign...'/>
    <Select.Content>
        <Select.Group >
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value=' '>Unassigned</Select.Item>
            {
                data.getAllUsers?.map((user :any,index:number)=>{
                    return <Select.Item key={index} value={user.id}>
                        {user.name}
                        </Select.Item>
                })
            }
           
        </Select.Group>
    </Select.Content>
   </Select.Root>
  </>
  )
}

export default AssigneeSelect
