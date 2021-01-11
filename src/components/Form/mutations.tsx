import { gql } from '@apollo/client';

export interface SignupInput {
    email: string
    password: string
    name: string
    country: string
    gender: string
}

export interface UserType {
    token: string
}

export const SIGN_UP = gql`
    mutation SignUp($user: SignupInput!) {
        signup(input: $user) {
            id
            name
            email
            country
            gender
        }
    }
`;
