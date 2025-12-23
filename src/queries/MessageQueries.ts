
export const mutationAddMessage = `#graphql
  mutation CreateMessage($input: CreateMessage!) {
    createMessage(input: $input) {
      id
      content
      createdAt
      user {
        id
        firstName
        lastName
      }
      course {
        id
        slug
      }
    }
  }
`;
