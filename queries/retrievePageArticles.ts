import { gql } from "@apollo/client";

// retrievePageArticles(page: ${pageNumber}) {
export const RETRIEVE_PAGE_QUERY = gql`
  query {
    retrievePageArticles(page: 1) {
      id
      author
      createdAt
      score
      updatedAt
      title
      text
      type
      url
    }
  }
`;
