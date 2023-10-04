/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment UserFragment on User {\n    id\n    username\n    avatarURL\n    isFollowing\n    isMe\n  }\n": types.UserFragmentFragmentDoc,
    "\n  fragment CategoryFragment on Category {\n    id\n    name\n    slug\n  }\n": types.CategoryFragmentFragmentDoc,
    "\n  fragment PhotoFragment on CoffeeShopPhoto {\n    id\n    url\n  }\n": types.PhotoFragmentFragmentDoc,
    "\n  fragment ShopFragment on CoffeeShop {\n    id\n    name\n    longitude\n    latitude\n    description\n    isMine\n    user {\n      ...UserFragment\n    }\n    photos {\n      ...PhotoFragment\n    }\n    categories {\n      ...CategoryFragment\n    }\n  }\n": types.ShopFragmentFragmentDoc,
    "\n  query me {\n    me {\n      profile {\n        ...UserFragment\n        email\n        name\n        location\n        githubUsername\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query seeCategory($category: String!, $offset: Int) {\n    seeCategory(category: $category, offset: $offset) {\n      ...ShopFragment\n    }\n  }\n": types.SeeCategoryDocument,
    "\n  mutation createAccount(\n    $username: String!\n    $email: String!\n    $name: String!\n    $location: String!\n    $password: String!\n    $githubUsername: String\n  ) {\n    createAccount(\n      username: $username\n      email: $email\n      name: $name\n      location: $location\n      password: $password\n      githubUsername: $githubUsername\n    ) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
    "\n  mutation editProfile(\n    $username: String\n    $name: String\n    $email: String\n    $githubUsername: String\n    $location: String\n    $oldPassword: String\n    $newPassword: String\n  ) {\n    editProfile(\n      username: $username\n      name: $name\n      email: $email\n      githubUsername: $githubUsername\n      location: $location\n      oldPassword: $oldPassword\n      newPassword: $newPassword\n    ) {\n      ok\n      error\n    }\n  }\n": types.EditProfileDocument,
    "\n  query seeCoffeeShops($offset: Int) {\n    seeCoffeeShops(offset: $offset) {\n      id\n      name\n      user {\n        ...UserFragment\n      }\n      photos {\n        ...PhotoFragment\n      }\n      categories {\n        ...CategoryFragment\n      }\n    }\n  }\n": types.SeeCoffeeShopsDocument,
    "\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
    "\n  query searchCoffeeShops($keyword: String!, $offset: Int) {\n    searchCoffeeShops(keyword: $keyword, offset: $offset) {\n      id\n      photos {\n        id\n        url\n      }\n    }\n  }\n": types.SearchCoffeeShopsDocument,
    "\n  query searchCategories($keyword: String!, $offset: Int) {\n    searchCategories(keyword: $keyword, offset: $offset) {\n      id\n      name\n      slug\n      totalShops\n    }\n  }\n": types.SearchCategoriesDocument,
    "\n  query seeCoffeeShop($id: Int!) {\n    seeCoffeeShop(id: $id) {\n      ...ShopFragment\n    }\n  }\n": types.SeeCoffeeShopDocument,
    "\n  mutation createCoffeeShop(\n    $name: String!\n    $file: [Upload!]!\n    $category: String\n    $longitude: String\n    $latitude: String\n    $description: String\n  ) {\n    createCoffeeShop(\n      name: $name\n      files: $file\n      category: $category\n      longitude: $longitude\n      latitude: $latitude\n      description: $description\n    ) {\n      ok\n      error\n      shop {\n        ...ShopFragment\n        photos {\n          ...PhotoFragment\n        }\n        user {\n          ...UserFragment\n        }\n        categories {\n          ...CategoryFragment\n        }\n      }\n    }\n  }\n": types.CreateCoffeeShopDocument,
    "\n  query seeProfile($username: String!) {\n    seeProfile(username: $username) {\n      ...UserFragment\n      name\n      location\n      githubUsername\n    }\n  }\n": types.SeeProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFragment on User {\n    id\n    username\n    avatarURL\n    isFollowing\n    isMe\n  }\n"): (typeof documents)["\n  fragment UserFragment on User {\n    id\n    username\n    avatarURL\n    isFollowing\n    isMe\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryFragment on Category {\n    id\n    name\n    slug\n  }\n"): (typeof documents)["\n  fragment CategoryFragment on Category {\n    id\n    name\n    slug\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PhotoFragment on CoffeeShopPhoto {\n    id\n    url\n  }\n"): (typeof documents)["\n  fragment PhotoFragment on CoffeeShopPhoto {\n    id\n    url\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShopFragment on CoffeeShop {\n    id\n    name\n    longitude\n    latitude\n    description\n    isMine\n    user {\n      ...UserFragment\n    }\n    photos {\n      ...PhotoFragment\n    }\n    categories {\n      ...CategoryFragment\n    }\n  }\n"): (typeof documents)["\n  fragment ShopFragment on CoffeeShop {\n    id\n    name\n    longitude\n    latitude\n    description\n    isMine\n    user {\n      ...UserFragment\n    }\n    photos {\n      ...PhotoFragment\n    }\n    categories {\n      ...CategoryFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      profile {\n        ...UserFragment\n        email\n        name\n        location\n        githubUsername\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      profile {\n        ...UserFragment\n        email\n        name\n        location\n        githubUsername\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query seeCategory($category: String!, $offset: Int) {\n    seeCategory(category: $category, offset: $offset) {\n      ...ShopFragment\n    }\n  }\n"): (typeof documents)["\n  query seeCategory($category: String!, $offset: Int) {\n    seeCategory(category: $category, offset: $offset) {\n      ...ShopFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount(\n    $username: String!\n    $email: String!\n    $name: String!\n    $location: String!\n    $password: String!\n    $githubUsername: String\n  ) {\n    createAccount(\n      username: $username\n      email: $email\n      name: $name\n      location: $location\n      password: $password\n      githubUsername: $githubUsername\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount(\n    $username: String!\n    $email: String!\n    $name: String!\n    $location: String!\n    $password: String!\n    $githubUsername: String\n  ) {\n    createAccount(\n      username: $username\n      email: $email\n      name: $name\n      location: $location\n      password: $password\n      githubUsername: $githubUsername\n    ) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editProfile(\n    $username: String\n    $name: String\n    $email: String\n    $githubUsername: String\n    $location: String\n    $oldPassword: String\n    $newPassword: String\n  ) {\n    editProfile(\n      username: $username\n      name: $name\n      email: $email\n      githubUsername: $githubUsername\n      location: $location\n      oldPassword: $oldPassword\n      newPassword: $newPassword\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile(\n    $username: String\n    $name: String\n    $email: String\n    $githubUsername: String\n    $location: String\n    $oldPassword: String\n    $newPassword: String\n  ) {\n    editProfile(\n      username: $username\n      name: $name\n      email: $email\n      githubUsername: $githubUsername\n      location: $location\n      oldPassword: $oldPassword\n      newPassword: $newPassword\n    ) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query seeCoffeeShops($offset: Int) {\n    seeCoffeeShops(offset: $offset) {\n      id\n      name\n      user {\n        ...UserFragment\n      }\n      photos {\n        ...PhotoFragment\n      }\n      categories {\n        ...CategoryFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query seeCoffeeShops($offset: Int) {\n    seeCoffeeShops(offset: $offset) {\n      id\n      name\n      user {\n        ...UserFragment\n      }\n      photos {\n        ...PhotoFragment\n      }\n      categories {\n        ...CategoryFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchCoffeeShops($keyword: String!, $offset: Int) {\n    searchCoffeeShops(keyword: $keyword, offset: $offset) {\n      id\n      photos {\n        id\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchCoffeeShops($keyword: String!, $offset: Int) {\n    searchCoffeeShops(keyword: $keyword, offset: $offset) {\n      id\n      photos {\n        id\n        url\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchCategories($keyword: String!, $offset: Int) {\n    searchCategories(keyword: $keyword, offset: $offset) {\n      id\n      name\n      slug\n      totalShops\n    }\n  }\n"): (typeof documents)["\n  query searchCategories($keyword: String!, $offset: Int) {\n    searchCategories(keyword: $keyword, offset: $offset) {\n      id\n      name\n      slug\n      totalShops\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query seeCoffeeShop($id: Int!) {\n    seeCoffeeShop(id: $id) {\n      ...ShopFragment\n    }\n  }\n"): (typeof documents)["\n  query seeCoffeeShop($id: Int!) {\n    seeCoffeeShop(id: $id) {\n      ...ShopFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCoffeeShop(\n    $name: String!\n    $file: [Upload!]!\n    $category: String\n    $longitude: String\n    $latitude: String\n    $description: String\n  ) {\n    createCoffeeShop(\n      name: $name\n      files: $file\n      category: $category\n      longitude: $longitude\n      latitude: $latitude\n      description: $description\n    ) {\n      ok\n      error\n      shop {\n        ...ShopFragment\n        photos {\n          ...PhotoFragment\n        }\n        user {\n          ...UserFragment\n        }\n        categories {\n          ...CategoryFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createCoffeeShop(\n    $name: String!\n    $file: [Upload!]!\n    $category: String\n    $longitude: String\n    $latitude: String\n    $description: String\n  ) {\n    createCoffeeShop(\n      name: $name\n      files: $file\n      category: $category\n      longitude: $longitude\n      latitude: $latitude\n      description: $description\n    ) {\n      ok\n      error\n      shop {\n        ...ShopFragment\n        photos {\n          ...PhotoFragment\n        }\n        user {\n          ...UserFragment\n        }\n        categories {\n          ...CategoryFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query seeProfile($username: String!) {\n    seeProfile(username: $username) {\n      ...UserFragment\n      name\n      location\n      githubUsername\n    }\n  }\n"): (typeof documents)["\n  query seeProfile($username: String!) {\n    seeProfile(username: $username) {\n      ...UserFragment\n      name\n      location\n      githubUsername\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;