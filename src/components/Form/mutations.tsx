import { gql } from '@apollo/client';

export interface CreateUserInput {
    email: string
    password: string
    fullName: string
    country: string
}

export interface AuthPayloadType {
    token: string
}

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput!) {
        createUser(input: $user) {
            token
        }
    }
`;
