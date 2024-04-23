
export const typeDefs = `#graphql
  scalar DateTime
  type Issue {
    id: Int !
    title: String
    description: String
    status: String
    createdAt: DateTime
    updatedAt: DateTime
    assignedToId: String
    assignedTo: User
    createdById: String!
  }
  type User {
  id: String!
  name: String
  email: String!
  emailVerified: DateTime
  image: String
  createdIssues: [Issue!] 
  assignedIssues: [Issue] 
}
enum Status {
  OPEN
  CLOSED
  IN_PROGRESS
}
#  union OrderByUnion = String

  type Query {
    getAllIssues: [Issue!]
    getAllUsers: [User!]
    getLatestIssues: [Issue!]
    getIssuesByPageNumber(status: Status, orderBy: String, pageSize: Int, page: Int):[Issue!]
  }
  type Mutation {
    createIssue(title: String!, description: String!): Issue
    updateIssue(id: Int!, title: String, description: String, status: Status, assignedToId: String): Issue
    deleteIssue(id: Int!): Issue
  }
  
`;