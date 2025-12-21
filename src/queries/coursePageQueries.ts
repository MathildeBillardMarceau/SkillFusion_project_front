export const queryCourseBySlug = `#graphql
    query CourseBySlug($slug: String!) {
      courseBySlug(slug: $slug) {
        id            #inutile ?
        title
        slug          #utilisé pour la requête
        description
        image
        level
        duration
        cost
        material
        publishedAt   #j'ai utilisé created at dans l'affichage
        createdAt
        updatedAt     #j'ai utilisé created at dans l'affichage
        user {
          firstName
          lastName
        }
        categories {  #pas disponibles actuellement
          name
          color
          icon
        }
        chapters {
          id
          title
          description
          text
          createdAt
          updatedAt
        }
      }
    }
    `;

export const queryMessagesByCourseSlug = `#graphql
    query MessagesByCourseSlug($slug: String!) {
      messagesByCourseSlug(slug: $slug) {
      id
      content
      createdAt
      updatedAt
      user {
        firstName
        lastName
        id
        avatar
        role
        }
      course {
        title
        }
    }
  }`;

// export const querySubscriptionByCourse = `#graphql
//       query SubscriptionByCourse($courseId: UUID!) {
//       subscriptionByCourse(courseId: $courseId) {
//         user {
//           id
//           firstName
//           lastName
//     }
//   }
// }
//     `;

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
