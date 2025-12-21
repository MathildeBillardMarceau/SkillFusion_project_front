export const querySubscriptionByUserAtCourse = `#graphql
  query SubscriptionByUserAtCourse($courseId: UUID!, $userId: UUID!) {
    subscriptionByUserAtCourse(courseId: $courseId, userId: $userId) {
      completion
      createdAt
      # course {
      #   slug
      # }
      # user {
      #   email
      # }
    }
  }
`;

export const mutationCreateUserSubscription = `#graphql
mutation CreateUserSubscription($input: CreateUserSubscription!) {
  createUserSubscription(input: $input) {
    course {
      id
    }
    user {
      id
    }
  }
}
  `;

export const mutationDeleteUserSubscription = `#graphql
mutation DeleteUserSubscription($userId: UUID!, $courseId: UUID!) {
  deleteUserSubscription(userId: $userId, courseId: $courseId)
}
`;
