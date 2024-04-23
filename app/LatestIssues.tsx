import prisma from "@/prisma/db";
import { Table,Flex, Avatar, Card, Heading } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import { GET_LATEST_ISSUES } from "@/lib/queries";
import client from "@/lib/apolloClient";
import { Issue, Status } from "@prisma/client";
const LatestIssues = async () => {
  // const issues = await prisma.issue.findMany({
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   take: 5,
  //   include :{
  //       assignedTo : true
  //   }
  // });
  const {data: {getLatestIssues}}=await client.query({query : GET_LATEST_ISSUES})
  const issues : { id : number , title : string , status : Status , assignedTo : { image : string | null }}[] = getLatestIssues 
  return (
    <Card>
        <Heading size='4' mb='5'>Latest Issues</Heading>
    <Table.Root>
      <Table.Body>
        {issues.map((issue, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
             <Flex  justify='between'>
             <Flex gap='2' direction="column" align='start'>
            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            <IssueStatusBadge status={issue.status}/>
                </Flex>
             {
                issue.assignedTo && <Avatar radius="full" fallback="?" src={issue.assignedTo.image!}></Avatar>
             }
             </Flex>
        </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
    </Card>
  );
};


export default LatestIssues;
