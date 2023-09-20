import { graphql } from "./gql";

export const USER_FRAGMENT = graphql(`
  fragment UserFragment on User {
    id
    username
    avatarURL
    isFollowing
    isMe
  }
`);
