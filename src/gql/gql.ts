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
    "\n  query me {\n    me {\n      profile {\n        ...UserFragment\n      }\n    }\n  }\n": types.MeDocument,
    "\n  mutation createAccount(\n    $username: String!\n    $email: String!\n    $name: String!\n    $location: String!\n    $password: String!\n    $githubUsername: String\n  ) {\n    createAccount(\n      username: $username\n      email: $email\n      name: $name\n      location: $location\n      password: $password\n      githubUsername: $githubUsername\n    ) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
    "\n  query seeCoffeeShops($offset: Int) {\n    seeCoffeeShops(offset: $offset) {\n      id\n      name\n      user {\n        ...UserFragment\n      }\n      photos {\n        ...PhotoFragment\n      }\n      categories {\n        ...CategoryFragment\n      }\n    }\n  }\n": types.SeeCoffeeShopsDocument,
    "\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
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
export function graphql(source: "\n  query me {\n    me {\n      profile {\n        ...UserFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      profile {\n        ...UserFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount(\n    $username: String!\n    $email: String!\n    $name: String!\n    $location: String!\n    $password: String!\n    $githubUsername: String\n  ) {\n    createAccount(\n      username: $username\n      email: $email\n      name: $name\n      location: $location\n      password: $password\n      githubUsername: $githubUsername\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount(\n    $username: String!\n    $email: String!\n    $name: String!\n    $location: String!\n    $password: String!\n    $githubUsername: String\n  ) {\n    createAccount(\n      username: $username\n      email: $email\n      name: $name\n      location: $location\n      password: $password\n      githubUsername: $githubUsername\n    ) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query seeCoffeeShops($offset: Int) {\n    seeCoffeeShops(offset: $offset) {\n      id\n      name\n      user {\n        ...UserFragment\n      }\n      photos {\n        ...PhotoFragment\n      }\n      categories {\n        ...CategoryFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query seeCoffeeShops($offset: Int) {\n    seeCoffeeShops(offset: $offset) {\n      id\n      name\n      user {\n        ...UserFragment\n      }\n      photos {\n        ...PhotoFragment\n      }\n      categories {\n        ...CategoryFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;