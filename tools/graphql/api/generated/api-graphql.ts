import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT Bearer token */
  token: Scalars['String'];
  user: User;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: Auth;
  login: Auth;
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};

/** Office Location */
export enum Office {
  Fc = 'FC',
  Kw = 'KW',
  Ham = 'HAM'
}

export type Query = {
  __typename?: 'Query';
  me: User;
  TeamMemberById: TeamMember;
};


export type QueryTeamMemberByIdArgs = {
  id: Scalars['String'];
  office: Office;
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/**
 * A Team member belongs to an office and only one office. They are implemented
 * uniquely to each office but must satisfy the TeamMember object type when resolved.
 */
export type TeamMember = {
  __typename?: 'TeamMember';
  /** All Team Members must have a unique office id */
  id: Scalars['String'];
  /** The office the team member belongs to */
  office: Office;
  /** Full Name of the Team Member */
  name: Scalars['String'];
  /** Indicates whether they play ping pong or not */
  playsPingpong?: Maybe<Scalars['Boolean']>;
  /** Their favourite color */
  favouriteColour?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type CoreUserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'created_at' | 'updated_at' | 'email' | 'role'>
);

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'Auth' }
    & Pick<Auth, 'token'>
    & { user: (
      { __typename?: 'User' }
      & CoreUserFieldsFragment
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Auth' }
    & Pick<Auth, 'token'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'role' | 'created_at' | 'updated_at'>
  ) }
);

export const CoreUserFieldsFragmentDoc = gql`
    fragment coreUserFields on User {
  id
  created_at
  updated_at
  email
  role
}
    `;
export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!) {
  signup(data: {email: $email, password: $password}) {
    token
    user {
      ...coreUserFields
    }
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
    token
  }
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    role
    created_at
    updated_at
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Signup(variables: SignupMutationVariables): Promise<SignupMutation> {
      return withWrapper(() => client.request<SignupMutation>(print(SignupDocument), variables));
    },
    Login(variables: LoginMutationVariables): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(print(LoginDocument), variables));
    },
    Me(variables?: MeQueryVariables): Promise<MeQuery> {
      return withWrapper(() => client.request<MeQuery>(print(MeDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;