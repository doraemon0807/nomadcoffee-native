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

export const CATEGORY_FRAGMENT = graphql(`
  fragment CategoryFragment on Category {
    id
    name
    slug
  }
`);

export const PHOTO_FRAGMENT = graphql(`
  fragment PhotoFragment on CoffeeShopPhoto {
    id
    url
  }
`);

export const SHOP_FRAGMENT = graphql(`
  fragment ShopFragment on CoffeeShop {
    id
    name
    longitude
    latitude
    description
    isMine
    user {
      ...UserFragment
    }
    photos {
      ...PhotoFragment
    }
    categories {
      ...CategoryFragment
    }
  }
`);
