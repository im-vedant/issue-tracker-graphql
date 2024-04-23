import { gql } from "@apollo/client"

export const CREATE_ISSUE=gql`
mutation CREATE_ISSUE_MUTATION($title: String!, $description: String!) {
  createIssue(title: $title, description: $description) {
    title
    description
    id
    createdById
    createdAt
    assignedToId
    status
    updatedAt
  }
}
`

export const UPDATE_ISSUE=gql`
mutation UPDATE_ISSUE_MUTATION($updateIssueId: Int!, $title: String, $description: String, $status: Status, $assignedToId: String) {
  updateIssue(id: $updateIssueId, title: $title, description: $description, status: $status, assignedToId: $assignedToId) {
    title
    status
    id
    updatedAt
    description
  }
}

`

export const DELETE_ISSUE=gql`
mutation DELETE_ISSUE_MUTATION($deleteIssueId: Int!) {
  deleteIssue(id: $deleteIssueId) {
    id
    title
    description
  }
}
`