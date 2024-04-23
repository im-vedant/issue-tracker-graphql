import { gql } from "@apollo/client";

export const GET_LATEST_ISSUES = gql`
	query getLatestIssuesQuery {
		getLatestIssues {
            title
        id
        assignedTo{
        image
        }
        status
		}
	}
`;

export const GET_ISSUES_BY_PAGE_NUMBER=gql`
        query getIssuesByPageQuery ($status: Status, $orderBy: String, $pageSize: Int, $page: Int) {
            getIssuesByPageNumber(status: $status, orderBy: $orderBy, pageSize: $pageSize, page: $page) {
                id
                title
                status
                createdAt
        }
  }
  `

  export const GET_ALL_USERS=gql`
  query getAllUsersQuery {
  getAllUsers {
    id
    name
  }
}

  `