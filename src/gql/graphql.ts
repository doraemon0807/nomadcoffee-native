/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  shops?: Maybe<Array<Maybe<CoffeeShop>>>;
  slug: Scalars['String']['output'];
  totalShops: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CoffeeShop = {
  __typename?: 'CoffeeShop';
  categories: Array<Maybe<Category>>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isMine: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  photos: Array<Maybe<CoffeeShopPhoto>>;
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type CoffeeShopPhoto = {
  __typename?: 'CoffeeShopPhoto';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  shop: CoffeeShop;
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type CreateCoffeeShopResult = {
  __typename?: 'CreateCoffeeShopResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  shop?: Maybe<CoffeeShop>;
};

export type FollowersResult = {
  __typename?: 'FollowersResult';
  error?: Maybe<Scalars['String']['output']>;
  followers?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean']['output'];
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type FollowingResult = {
  __typename?: 'FollowingResult';
  error?: Maybe<Scalars['String']['output']>;
  following?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean']['output'];
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type MeResult = {
  __typename?: 'MeResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  profile?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: MutationResponse;
  createCoffeeShop: CreateCoffeeShopResult;
  deleteCoffeeShop: MutationResponse;
  editCoffeeShop: MutationResponse;
  editProfile: MutationResponse;
  followUser: MutationResponse;
  login: LoginResult;
  unfollowUser: MutationResponse;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String']['input'];
  githubUsername?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateCoffeeShopArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  files: Array<Scalars['Upload']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationDeleteCoffeeShopArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditCoffeeShopArgs = {
  categories?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  latitude?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditProfileArgs = {
  avatarURL?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  githubUsername?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationFollowUserArgs = {
  username: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String']['input'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  followers: FollowersResult;
  following: FollowingResult;
  me: MeResult;
  searchCategories: Array<Maybe<Category>>;
  searchCoffeeShops: Array<Maybe<CoffeeShop>>;
  searchUsers?: Maybe<Array<Maybe<User>>>;
  seeCategories: Array<Maybe<Category>>;
  seeCategory: Array<Maybe<CoffeeShop>>;
  seeCoffeeShop?: Maybe<CoffeeShop>;
  seeCoffeeShops: Array<Maybe<CoffeeShop>>;
  seeProfile?: Maybe<User>;
  seeUser?: Maybe<User>;
};


export type QueryFollowersArgs = {
  lastId?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};


export type QueryFollowingArgs = {
  lastId?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};


export type QuerySearchCategoriesArgs = {
  keyword: Scalars['String']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchCoffeeShopsArgs = {
  keyword: Scalars['String']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String']['input'];
  lastId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeCategoriesArgs = {
  lastId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeCategoryArgs = {
  category: Scalars['String']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeCoffeeShopArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySeeCoffeeShopsArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySeeProfileArgs = {
  username: Scalars['String']['input'];
};


export type QuerySeeUserArgs = {
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatarURL?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  githubUsername?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isFollowing: Scalars['Boolean']['output'];
  isMe: Scalars['Boolean']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  totalFollowers: Scalars['Int']['output'];
  totalFollowing: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserFragmentFragment = { __typename?: 'User', id: number, username: string, avatarURL?: string | null, isFollowing: boolean, isMe: boolean };

export type CategoryFragmentFragment = { __typename?: 'Category', id: number, name: string, slug: string };

export type PhotoFragmentFragment = { __typename?: 'CoffeeShopPhoto', id: number, url: string };

export type ShopFragmentFragment = { __typename?: 'CoffeeShop', id: number, name: string, longitude?: string | null, latitude?: string | null, description?: string | null, isMine: boolean, user?: { __typename?: 'User', id: number, username: string, avatarURL?: string | null, isFollowing: boolean, isMe: boolean } | null, photos: Array<{ __typename?: 'CoffeeShopPhoto', id: number, url: string } | null>, categories: Array<{ __typename?: 'Category', id: number, name: string, slug: string } | null> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeResult', profile?: { __typename?: 'User', email: string, name: string, location: string, githubUsername?: string | null, id: number, username: string, avatarURL?: string | null, isFollowing: boolean, isMe: boolean } | null } };

export type SeeCategoryQueryVariables = Exact<{
  category: Scalars['String']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SeeCategoryQuery = { __typename?: 'Query', seeCategory: Array<{ __typename?: 'CoffeeShop', id: number, name: string, longitude?: string | null, latitude?: string | null, description?: string | null, isMine: boolean, user?: { __typename?: 'User', id: number, username: string, avatarURL?: string | null, isFollowing: boolean, isMe: boolean } | null, photos: Array<{ __typename?: 'CoffeeShopPhoto', id: number, url: string } | null>, categories: Array<{ __typename?: 'Category', id: number, name: string, slug: string } | null> } | null> };

export type CreateAccountMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  location: Scalars['String']['input'];
  password: Scalars['String']['input'];
  githubUsername?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type EditProfileMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  githubUsername?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type SeeCoffeeShopsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SeeCoffeeShopsQuery = { __typename?: 'Query', seeCoffeeShops: Array<{ __typename?: 'CoffeeShop', id: number, name: string, user?: { __typename?: 'User', id: number, username: string, avatarURL?: string | null, isFollowing: boolean, isMe: boolean } | null, photos: Array<{ __typename?: 'CoffeeShopPhoto', id: number, url: string } | null>, categories: Array<{ __typename?: 'Category', id: number, name: string, slug: string } | null> } | null> };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', ok: boolean, token?: string | null, error?: string | null } };

export type SearchCoffeeShopsQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchCoffeeShopsQuery = { __typename?: 'Query', searchCoffeeShops: Array<{ __typename?: 'CoffeeShop', id: number, photos: Array<{ __typename?: 'CoffeeShopPhoto', id: number, url: string } | null> } | null> };

export type SearchCategoriesQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchCategoriesQuery = { __typename?: 'Query', searchCategories: Array<{ __typename?: 'Category', id: number, name: string, slug: string, totalShops: number } | null> };

export type SeeCoffeeShopQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type SeeCoffeeShopQuery = { __typename?: 'Query', seeCoffeeShop?: { __typename?: 'CoffeeShop', id: number, name: string, longitude?: string | null, latitude?: string | null, description?: string | null, isMine: boolean, user?: { __typename?: 'User', id: number, username: string, avatarURL?: string | null, isFollowing: boolean, isMe: boolean } | null, photos: Array<{ __typename?: 'CoffeeShopPhoto', id: number, url: string } | null>, categories: Array<{ __typename?: 'Category', id: number, name: string, slug: string } | null> } | null };

export type CreateCoffeeShopMutationVariables = Exact<{
  name: Scalars['String']['input'];
  file: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
  category?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateCoffeeShopMutation = { __typename?: 'Mutation', createCoffeeShop: { __typename?: 'CreateCoffeeShopResult', ok: boolean, error?: string | null, shop?: { __typename?: 'CoffeeShop', id: number, name: string, longitude?: string | null, latitude?: string | null, description?: string | null, isMine: boolean, photos: Array<{ __typename?: 'CoffeeShopPhoto', id: number, url: string } | null>, user?: { __typename?: 'User', id: number, username: string, avatarURL?: string | null, isFollowing: boolean, isMe: boolean } | null, categories: Array<{ __typename?: 'Category', id: number, name: string, slug: string } | null> } | null } };

export type SeeProfileQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type SeeProfileQuery = { __typename?: 'Query', seeProfile?: { __typename?: 'User', name: string, location: string, githubUsername?: string | null, id: number, username: string, avatarURL?: string | null, isFollowing: boolean, isMe: boolean } | null };

export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const PhotoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShopPhoto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<PhotoFragmentFragment, unknown>;
export const CategoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<CategoryFragmentFragment, unknown>;
export const ShopFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShopFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShopPhoto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<ShopFragmentFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"githubUsername"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const SeeCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShopFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShopPhoto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShopFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFragment"}}]}}]}}]} as unknown as DocumentNode<SeeCategoryQuery, SeeCategoryQueryVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"githubUsername"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"githubUsername"},"value":{"kind":"Variable","name":{"kind":"Name","value":"githubUsername"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const EditProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"githubUsername"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"githubUsername"},"value":{"kind":"Variable","name":{"kind":"Name","value":"githubUsername"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditProfileMutation, EditProfileMutationVariables>;
export const SeeCoffeeShopsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeCoffeeShops"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeCoffeeShops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShopPhoto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SearchCoffeeShopsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchCoffeeShops"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchCoffeeShops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<SearchCoffeeShopsQuery, SearchCoffeeShopsQueryVariables>;
export const SearchCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"totalShops"}}]}}]}}]} as unknown as DocumentNode<SearchCategoriesQuery, SearchCategoriesQueryVariables>;
export const SeeCoffeeShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeCoffeeShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeCoffeeShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShopFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShopPhoto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShopFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFragment"}}]}}]}}]} as unknown as DocumentNode<SeeCoffeeShopQuery, SeeCoffeeShopQueryVariables>;
export const CreateCoffeeShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCoffeeShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoffeeShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"files"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"shop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ShopFragment"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShopPhoto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ShopFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoffeeShop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFragment"}}]}}]}}]} as unknown as DocumentNode<CreateCoffeeShopMutation, CreateCoffeeShopMutationVariables>;
export const SeeProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"githubUsername"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}}]} as unknown as DocumentNode<SeeProfileQuery, SeeProfileQueryVariables>;