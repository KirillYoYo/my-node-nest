import { gql } from '@apollo/client'

export const GET_PERSON_EMAIL = gql`
    query GetPerson {
        person {
            email
            _id
        }
    }
`
