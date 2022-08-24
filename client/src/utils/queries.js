import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    user {
      username
      email
      savedBooks {
        title
        authors
        description
        image
        link
        bookId
      }
    }
  }
`;
